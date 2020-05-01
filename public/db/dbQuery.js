
function userFunction(pdb) {
    const attributes = [];
    pdb.enumAttributes((index, attrDef, attrRaw) => {
        attributes.push({
            index,
            attrDef,
            attrRaw
        });
    });

    const elements = [];
    //enumerate through all the objects
    pdb.enumObjects((dbId) => {
        // create a blank element
        const element = {};
        //enumerate through the map of the object properties
        pdb.enumObjectProperties(dbId, (attrId, valId) => {
            //TODO: types
            // find the attribute who's index matches the attrId of the object property
            const attributeName = attributes.find((e) => e.index === attrId) //then retrive the name from the attribute definition
                .attrDef["name"];
            //then find the value through pdb query
            const attributeValue = pdb.getAttrValue(attrId, valId);
            //assign value to the key in the element
            element[attributeName] = attributeValue;
        });
        element["Id"] = dbId;
        // add element to the array
        elements.push(element);
    });

    return elements;
}