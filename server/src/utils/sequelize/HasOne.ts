import 'reflect-metadata';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export function HasOne(relatedEntity: () => Object) {
    return function(target: any, key: string) {
        const hasManyEntities =
            Reflect.getMetadata(
                DecoratorsMetadataKeys.hasManyEntities,
                target
            ) || [];

        const hasManyEntity = {
            name: key,
            entity: relatedEntity
        };

        Reflect.defineMetadata(
            DecoratorsMetadataKeys.hasManyEntities,
            [...hasManyEntities, hasManyEntity],
            target
        );
    };
}