import 'reflect-metadata';

export function Id() {
    return function(target: any, key: string) {
        var t = Reflect.getMetadata('design:type', target, key);
        console.log(t.name);
    };
}
