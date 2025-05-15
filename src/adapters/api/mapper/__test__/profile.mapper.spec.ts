import { ProfileMapper } from '../profile.mapper';
import { ProfileRequest } from '../../request/profile.request';
import { UserType } from '../../../../core/domain/type/UserType';

describe('ProfileMapper', () => {
  it('should map ProfileRequest to itself', () => {
    // Given
    const user: ProfileRequest = {
      id: 'user-1',
      email: 'user@example.com',
      type: UserType.SPEAKER,
    };

    // When
    const result = ProfileMapper.fromDomain(user);

    // Then
    expect(result).toEqual({
      id: 'user-1',
      email: 'user@example.com',
      type: UserType.SPEAKER,
    });
  });
});
