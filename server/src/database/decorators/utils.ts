import 'reflect-metadata';

import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export type PropertyDefinition = { [key: string]: {} };

export function setFieldDefinition(
    target: any,
    key: string,
    propDefinition: PropertyDefinition
) {
    const propertiesDefinitions: { [key: string]: {} }[] =
        Reflect.getMetadata(
            DecoratorsMetadataKeys.propertiesDefinition,
            target
        ) || [];
    const propertyDefinitionIndex = propertiesDefinitions.findIndex(
        propertyDef => propertyDef.name === key
    );

    if (propertyDefinitionIndex !== -1) {
        const propertyDefinition =
            propertiesDefinitions[propertyDefinitionIndex].definition;
        propertiesDefinitions[propertyDefinitionIndex] = {
            ...propertiesDefinitions[propertyDefinitionIndex],
            definition: { ...propertyDefinition, ...propDefinition }
        };
    } else {
        propertiesDefinitions.push({
            definition: propDefinition,
            name: key
        });
    }

    Reflect.defineMetadata(
        DecoratorsMetadataKeys.propertiesDefinition,
        propertiesDefinitions,
        target
    );
}
