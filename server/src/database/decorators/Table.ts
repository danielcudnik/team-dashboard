import 'reflect-metadata';

import { DataTypes, STRING } from 'sequelize';
import { DbConnectionCreator } from '../DbConnectionCreator';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';

export function Table() {
    return function(Model: any) {
        const modelName = Model.name.toLowerCase();
        const sequelize = DbConnectionCreator.getInstance();

        const modelObject: { [key: string]: {} } = {
            id: {
                type: STRING,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            }
        };

        const propertiesDefinition =
            Reflect.getMetadata(
                DecoratorsMetadataKeys.propertiesDefinition,
                Model.prototype
            ) || [];

        for (let { name, definition } of propertiesDefinition) {
            modelObject[name] = definition;
        }

        Model.init(modelObject, {
            sequelize,
            modelName: modelName
            // options
        });
    };
}
