import 'reflect-metadata';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export function BelongsTo(relatedEntity: () => Object) {
    return function(target: any, key: string) {
        const belongsToEntities =
            Reflect.getMetadata(
                DecoratorsMetadataKeys.belongsTo,
                target
            ) || [];

        const belongToEntity = {
            name: key,
            entity: relatedEntity
        };

        Reflect.defineMetadata(
            DecoratorsMetadataKeys.belongsTo,
            [...belongsToEntities, belongToEntity],
            target
        );
    };
}