import { UseCase } from '../base/use-case';
import { TalkRepository } from '../domain/repository/talk.repository';
import { TalkNotFoundError } from '../domain/error/TalkNotFoundError';
import { User } from '../domain/model/User';
import { UserType } from '../domain/type/UserType';
import { UserNotAllowedToUpdateTalkError } from '../domain/error/UserNotAllowedToUpdateTalkError';

export type DeleteTalkCommand = {
  currentUser: Pick<User, 'id' | 'type'>;
  talkId: string;
};

export class DeleteTalkUseCase implements UseCase<DeleteTalkCommand, void> {
  constructor(private readonly talkRepository: TalkRepository) {}

  async execute(command: DeleteTalkCommand): Promise<void> {
    if (!this.canExecute(command.currentUser)) {
      throw new UserNotAllowedToUpdateTalkError(
        'User not allowed to delete talk',
      );
    }
    const existingTalk = await this.talkRepository.findById(command.talkId);
    if (!existingTalk) {
      throw new TalkNotFoundError(command.talkId);
    }
    await this.talkRepository.remove(existingTalk.id);
  }

  private canExecute(currentUser: Pick<User, 'id' | 'type'>): boolean {
    return currentUser.type === UserType.PLANNER;
  }
}
