export interface EntityMapper<Entity, DTO> {
  fromDomain(entity: Entity): DTO;

  toDomain(dto: DTO): Entity;
}
