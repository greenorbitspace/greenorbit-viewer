var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import objectArrayTrait from "../Decorators/objectArrayTrait";
import primitiveArrayTrait from "../Decorators/primitiveArrayTrait";
import primitiveTrait from "../Decorators/primitiveTrait";
import ModelTraits from "../ModelTraits";
import { traitClass } from "../Trait";
import mixTraits from "../mixTraits";
import ApiRequestTraits, { QueryParamTraits } from "./ApiRequestTraits";
import AutoRefreshingTraits from "./AutoRefreshingTraits";
import CatalogMemberTraits from "./CatalogMemberTraits";
import LegendOwnerTraits from "./LegendOwnerTraits";
import TableTraits from "./Table/TableTraits";
export class ApiTableRequestTraits extends mixTraits(ApiRequestTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "PER_ROW"
        });
        Object.defineProperty(this, "columnMajorColumnNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["value"]
        });
    }
}
__decorate([
    primitiveTrait({
        name: "Kind",
        type: "string",
        description: "Determines how table rows are constructed from this API.\n" +
            '* PER_ROW: Row major, values are specific to a row in the table eg. [{"col1": 12, "col2": 13}] \n' +
            "* PER_ID: Values are the same for all objects with the same id.\n" +
            '* COLUMN_MAJOR: API response is in a column major format, eg. [{"row1": 12, "row2": 13}]. The keys in each list item (eg. "row1") will be used as the row id.\n'
    })
], ApiTableRequestTraits.prototype, "kind", void 0);
__decorate([
    primitiveArrayTrait({
        name: "Column major column names",
        type: "string",
        description: 'Used when `kind` is "COLUMN_MAJOR". The name of each column in the order they appear in the API response.'
    })
], ApiTableRequestTraits.prototype, "columnMajorColumnNames", void 0);
export class ApiTableColumnTraits extends ModelTraits {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "responseDataPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
__decorate([
    primitiveTrait({
        name: "Name",
        type: "string",
        description: "Column name. This must match name in `columns`."
    })
], ApiTableColumnTraits.prototype, "name", void 0);
__decorate([
    primitiveTrait({
        name: "Response data path",
        type: "string",
        description: "Path to relevant data in JSON response. eg: `some.user.name`, `some.users[0].name` or `some.users[].name`. For data to be parsed correctly, it must return a primitive value (string, number, boolean)."
    })
], ApiTableColumnTraits.prototype, "responseDataPath", void 0);
let ApiTableCatalogItemTraits = class ApiTableCatalogItemTraits extends mixTraits(TableTraits, CatalogMemberTraits, LegendOwnerTraits, AutoRefreshingTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "apis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "apiColumns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "idKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shouldAppendNewData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "queryParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "updateQueryParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
};
__decorate([
    objectArrayTrait({
        name: "APIs",
        type: ApiTableRequestTraits,
        description: 'The apis to use to retrieve the data of the table. Note: you **must** define which columns to use from API response in the `columns` `TableColumnTraits` - for example `[{name:"some-key-in-api-response", ...}]`',
        idProperty: "url"
    })
], ApiTableCatalogItemTraits.prototype, "apis", void 0);
__decorate([
    objectArrayTrait({
        name: "API Columns",
        type: ApiTableColumnTraits,
        description: 'ApiTableCatalogItem specific column configuration. Note: you **must** define which columns to use from API response in the `columns` `TableColumnTraits` - for example `[{name:"some-key-in-api-response", ...}]`. This object only adds additional properties',
        idProperty: "name"
    })
], ApiTableCatalogItemTraits.prototype, "apiColumns", void 0);
__decorate([
    primitiveTrait({
        name: "Id key",
        type: "string",
        description: "The name of the id property shared between all APIs"
    })
], ApiTableCatalogItemTraits.prototype, "idKey", void 0);
__decorate([
    primitiveTrait({
        name: "Should append new data",
        type: "string",
        description: "When true, new data received through APIs will be appended to existing data. If false, new data will replace existing data."
    })
], ApiTableCatalogItemTraits.prototype, "shouldAppendNewData", void 0);
__decorate([
    objectArrayTrait({
        name: "Common query parameters",
        type: QueryParamTraits,
        description: "Common query parameters to supply to all APIs. These are merged into the query parameters for each API.",
        idProperty: "name"
    })
], ApiTableCatalogItemTraits.prototype, "queryParameters", void 0);
__decorate([
    objectArrayTrait({
        name: "Common query parameters for updates",
        type: QueryParamTraits,
        description: "Common query parameters to supply to all APIs on subsequent calls after the first call. These are merged into the update query parameters for each API.",
        idProperty: "name"
    })
], ApiTableCatalogItemTraits.prototype, "updateQueryParameters", void 0);
ApiTableCatalogItemTraits = __decorate([
    traitClass({
        description: `Creates an <b>api-table</b> type dataset in the catalog, typically used for live sensor data.`,
        example: {
            type: "api-table",
            name: "City of Melbourne Pedestrian Counter",
            description: "The City of Melbourne Pedestrian Counting System data has been obtained from the City of Melbourne Open data platform: www.data.melbourne.vic.gov.au to demonstrate the directional movement of pedestrians across the city.\n\nThe counters generate a per minute reading on each of the pedestrian traffic sensors which are then displayed as near-live data.\n\nTo find out more about the City of Melbourne's Pedestrian Counting System or to seek access to their data, please click:\n\nhttp://www.pedestrian.melbourne.vic.gov.au/?_ga=2.244642053.1432520662.1632694466-1456630549.1631675392#date=27-09-2021&time=1",
            defaultStyle: {
                time: {
                    spreadFinishTime: true,
                    timeColumn: "sensing_datetime"
                }
            },
            initialTimeSource: "stop",
            columns: [
                {
                    name: "total_of_directions"
                },
                {
                    name: "direction_2"
                },
                {
                    name: "direction_1"
                },
                {
                    name: "sensing_datetime"
                },
                {
                    name: "latitude"
                },
                {
                    name: "longitude"
                }
            ],
            idKey: "location_id",
            refreshInterval: 60,
            removeDuplicateRows: true,
            apis: [
                {
                    url: "https://melbournetestbed.opendatasoft.com/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-past-hour-counts-per-minute/records?select=location_id%2Csensing_datetime%2Cdirection_1%2Cdirection_2%2Ctotal_of_directions&order_by=sensing_datetime%20DESC&limit=100",
                    responseDataPath: "results",
                    kind: "PER_ROW"
                },
                {
                    url: "https://melbournetestbed.opendatasoft.com/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-sensor-locations/exports/json?lang=en&timezone=Australia%2FSydney",
                    kind: "PER_ID"
                }
            ]
        }
    })
], ApiTableCatalogItemTraits);
export default ApiTableCatalogItemTraits;
//# sourceMappingURL=ApiTableCatalogItemTraits.js.map