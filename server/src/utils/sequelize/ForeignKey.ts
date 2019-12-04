import 'reflect-metadata';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export function ForeignKey(foreignKeyEntity: () => Object) {
    return function(target: any, key: string) {
        const foreignKeys =
            Reflect.getMetadata(DecoratorsMetadataKeys.foreignKeys, target) ||
            [];

        const foreignKey = {
            name: key,
            entity: foreignKeyEntity
        };

        Reflect.defineMetadata(
            DecoratorsMetadataKeys.foreignKeys,
            [...foreignKeys, foreignKey],
            target
        );
    };
}