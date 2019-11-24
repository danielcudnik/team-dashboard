import 'reflect-metadata';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export function BelongsToMany(relatedEntity: () => Object, through: () => Object) {
    return function(target: any, key: string) {
        const belongsToManyEntities =
            Reflect.getMetadata(
                DecoratorsMetadataKeys.belongsToMany,
                target
            ) || [];

        const belongToManyEntity = {
            name: key,
            entity: relatedEntity,
            through
        };

        Reflect.defineMetadata(
            DecoratorsMetadataKeys.belongsToMany,
            [...belongsToManyEntities, belongToManyEntity],
            target
        );
    };
}