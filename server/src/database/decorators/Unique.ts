import 'reflect-metadata';

import { setFieldDefinition } from './utils';

export function Unique() {
    return function(target: any, key: string) {
        setFieldDefinition(target, key, { unique: true });
    };
}
