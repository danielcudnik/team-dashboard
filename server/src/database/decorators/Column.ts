import 'reflect-metadata';

import { DataTypes } from 'sequelize';
import { setFieldDefinition } from './utils';

enum DataTypesKeys {
    String = 'STRING',
    Number = 'INTEGER'
}

const DESIGN_TYPE = 'design:type';

export function Column() {
    return function(target: any, key: string) {
        const typeObj = Reflect.getMetadata(DESIGN_TYPE, target, key);
        const type = getType(typeObj.name);
        const sequelizeType = DataTypes[type as DataTypesKeys];

        setFieldDefinition(target, key, { type: sequelizeType });
    };
}

function getType(type: string): string {
    if (type === 'Number') {
        return DataTypesKeys.Number;
    }
    return type.toUpperCase();
}
