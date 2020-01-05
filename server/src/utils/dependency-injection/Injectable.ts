import 'reflect-metadata';
import { DIKeys } from './DIKeys';

export function Injectable() {
    return function<T extends { new (...args: any[]): {} }>(target: T) {
        Reflect.defineMetadata(
            DIKeys.registeredInjectables,
            new target(),
            target
        );
    };
}
