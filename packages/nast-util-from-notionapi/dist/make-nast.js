"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./transformer");
function makeNast(allRecords) {
    /* Cast BlockRecordValue to BlockNode. */
    let list = allRecords.map((record, index) => {
        /** First record must be root. */
        if (index === 0 && record.value.type === 'page') {
            return transformer_1.transformRoot(record.value);
        }
        switch (record.value.type) {
            case :
        }
        return {
            id: record.value.id,
            type: record.value.type,
            data: record.value.properties,
            raw_value: record.value,
            children: []
        };
    });
}
exports.makeNast = makeNast;
