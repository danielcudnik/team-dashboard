import 'reflect-metadata';

import { setFieldDefinition } from './utils';

export function NotNull() {
    return function(target: any, key: string) {
        setFieldDefinition(target, key, { allowNull: false });
    };
}
