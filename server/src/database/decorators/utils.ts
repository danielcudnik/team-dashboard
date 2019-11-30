import 'reflect-metadata';
import { DataType } from 'sequelize';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export enum DataTypesKeys {
    String = 'STRING',
    Number = 'INTEGER'
}

export interface ColumnOptions {
    type?: DataType;
    defaultValue?: string | number | boolean | Date;
    allowNull?: boolean;
    unique?: boolean | string;
    primaryKey?: boolean;
    autoIncrement?: boolean;
    field?: string;
    comment?: string;
};

export function setFieldDefinition(
    target: any,
    key: string,
    options: ColumnOptions
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
            definition: { ...propertyDefinition, ...options }
        };
    } else {
        propertiesDefinitions.push({
            definition: options,
            name: key
        });
    }

    Reflect.defineMetadata(
        DecoratorsMetadataKeys.propertiesDefinition,
        propertiesDefinitions,
        target
    );
}
