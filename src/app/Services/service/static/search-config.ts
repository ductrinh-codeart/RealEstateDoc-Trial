export var SearchConfig = {
    defaultSearchFields: { cache: false, filelds: ['Code', 'Name', '_uid']},

    SYS_Status: {cache: true},
    SYS_Type: {cache: true},

    getSearchFields: function (name: any) {
        let result = {
            name:name,
            value:this.defaultSearchFields
        };

        if (name) {
            result.value = name;
            
        }
        
        return result;
    }
}