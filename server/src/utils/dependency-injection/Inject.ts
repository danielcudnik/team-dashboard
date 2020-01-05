import 'reflect-metadata';

import { DIKeys } from './DIKeys';
const DESIGN_TYPE = 'design:type';

export function Inject() {
    return function(target: any, key: string) {
        const typeObj = Reflect.getMetadata(DESIGN_TYPE, target, key);

        const registeredInjectable =
            Reflect.getMetadata(DIKeys.registeredInjectables, typeObj) || null;

        target[key] = registeredInjectable;
    };
}
