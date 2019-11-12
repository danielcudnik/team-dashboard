import 'reflect-metadata';

import { STRING, INTEGER, DataTypes, DataType, UUID, Model } from 'sequelize';
import { DbConnectionCreator } from '../DbConnectionCreator';

export enum DecoratorsMetatdataKeys {
    propertiesDefinition = 'propertiesDefinition',
    hasManyEntities = 'hasManyEntities',
    foreignKeys = 'foreignKeys',
    model = 'model'
}

export function Table() {
    return function(Model: any) {
        const modelName = Model.name.toLowerCase();
        const sequelize = DbConnectionCreator.getInstance();

        const modelObject: { [key: string]: {} } = {
            id: {
                type: UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            }
        };

        const propertiesDefinition =
            Reflect.getMetadata(
                DecoratorsMetatdataKeys.propertiesDefinition,
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

enum DataTypesKeys {
    String = 'STRING',
    Number = 'INTEGER'
}

export function Column() {
    return function(target: any, key: string) {
        const typeObj = Reflect.getMetadata('design:type', target, key);
        const type = getType(typeObj.name);

        const sequelizeType = DataTypes[type as DataTypesKeys];

        const propertyDefinition = {
            name: key,
            definition: {
                type: sequelizeType
            }
        };

        const propertiesDefinition =
            Reflect.getMetadata(
                DecoratorsMetatdataKeys.propertiesDefinition,
                target
            ) || [];

        Reflect.defineMetadata(
            DecoratorsMetatdataKeys.propertiesDefinition,
            [...propertiesDefinition, propertyDefinition],
            target
        );
    };
}

export function Id() {
    return function(target: any, key: string) {
        var t = Reflect.getMetadata('design:type', target, key);
        console.log(t.name);
    };
}

export function OneToMany(relatedEntityName: string) {
    return function(target: any, key: string) {
        const hasManyEntities =
            Reflect.getMetadata(
                DecoratorsMetatdataKeys.hasManyEntities,
                target
            ) || [];

        const hasManyEntity = {
            name: key,
            entity: relatedEntityName
        };

        Reflect.defineMetadata(
            DecoratorsMetatdataKeys.hasManyEntities,
            [...hasManyEntities, hasManyEntity],
            target
        );
    };
}

export function ForeignKey(foreignKeyEntityName: string) {
    return function(target: any, key: string) {
        const foreignKeys =
            Reflect.getMetadata(DecoratorsMetatdataKeys.foreignKeys, target) ||
            [];

        const foreignKey = {
            name: key,
            entity: foreignKeyEntityName
        };

        Reflect.defineMetadata(
            DecoratorsMetatdataKeys.foreignKeys,
            [...foreignKeys, foreignKey],
            target
        );
    };
}

function getType(type: string): string {
    if (type === 'Number') {
        return DataTypesKeys.Number;
    }
    return type.toUpperCase();
}

export function defineRelations(models: typeof Model[]) {
    for (let Model of models) {
        const hasManyEntities =
            Reflect.getMetadata(
                DecoratorsMetatdataKeys.hasManyEntities,
                Model.prototype
            ) || [];

        for (let hasMany of hasManyEntities) {
            const hasManyEntityName = hasMany.entity.toLowerCase();
            const hasManyEntity = models.find(
                model => model.name === hasManyEntityName
            );
            console.log('Model');
            console.log(Model);
            console.log(hasManyEntity);
            if (hasManyEntity) {
                Model.hasMany(hasManyEntity);
            }
        }

        const foreignKeys =
            Reflect.getMetadata(
                DecoratorsMetatdataKeys.foreignKeys,
                Model.prototype
            ) || [];

        for (let foreignKey of foreignKeys) {
            const foreignKeyEntityName = foreignKey.entity.toLowerCase();
            const foreignKeyEntity = models.find(
                model => model.name === foreignKeyEntityName
            );

            if (foreignKeyEntity) {
                Model.belongsTo(foreignKeyEntity);
            }
        }
    }
}
