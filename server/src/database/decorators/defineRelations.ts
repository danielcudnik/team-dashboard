import 'reflect-metadata';
import { DecoratorsMetadataKeys } from './DecoratorsMetadataKeys';
import { Model } from 'sequelize';

export function defineRelations(models: typeof Model[]) {
    for (let Model of models) {
        defineHasOneRelations(Model, models);
        defineHasManyRelations(Model, models);
        defineBelongsToRelations(Model, models);
        defineBelongsToManyRelations(Model, models);
        defineForeignKeys(Model, models);
    }
}

function defineHasOneRelations(M: typeof Model, models: typeof Model[]) {
    const hasOneEntity =
        Reflect.getMetadata(DecoratorsMetadataKeys.hasOneEntity, M.prototype) ||
        [];
    for (let { entity } of hasOneEntity) {
        const hasOneEntityName = entity().name;
        const hasOneEntity = models.find(
            model => model.name === hasOneEntityName
        );

        if (hasOneEntity) {
            M.hasOne(hasOneEntity);
        }
    }
}

function defineHasManyRelations(M: typeof Model, models: typeof Model[]) {
    const hasManyEntities =
        Reflect.getMetadata(
            DecoratorsMetadataKeys.hasManyEntities,
            M.prototype
        ) || [];
    for (let { entity } of hasManyEntities) {
        const hasManyEntityName = entity().name;
        const hasManyEntity = models.find(
            model => model.name === hasManyEntityName
        );

        if (hasManyEntity) {
            M.hasMany(hasManyEntity);
        }
    }
}

function defineBelongsToRelations(M: typeof Model, models: typeof Model[]) {
    const belongToEntities =
        Reflect.getMetadata(DecoratorsMetadataKeys.belongsTo, M.prototype) ||
        [];

    for (let { entity } of belongToEntities) {
        const belongToEntityName = entity().name;
        const belongToEntity = models.find(
            model => model.name === belongToEntityName
        );

        if (belongToEntity) {
            M.belongsTo(belongToEntity);
        }
    }
}

function defineBelongsToManyRelations(M: typeof Model, models: typeof Model[]) {
    const belongToManyEntities =
        Reflect.getMetadata(
            DecoratorsMetadataKeys.belongsToMany,
            M.prototype
        ) || [];

    for (let { entity, through } of belongToManyEntities) {
        const belongToManyEntityName = entity().name;
        const belongToManyEntity = models.find(
            model => model.name === belongToManyEntityName
        );

        if (belongToManyEntity) {
            M.belongsToMany(belongToManyEntity, {
                through: through().name
            });
        }
    }
}

function defineForeignKeys(M: typeof Model, models: typeof Model[]) {
    const foreignKeys =
        Reflect.getMetadata(DecoratorsMetadataKeys.foreignKeys, M.prototype) ||
        [];

    for (let { entity } of foreignKeys) {
        const foreignKeyEntityName = entity().name;
        const foreignKeyEntity = models.find(
            model => model.name === foreignKeyEntityName
        );

        if (foreignKeyEntity) {
            M.belongsTo(foreignKeyEntity);
        }
    }
}
