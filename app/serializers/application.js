import DS from "ember-data";

export default DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    if(Array.isArray(payload)) {
      return {"pulls": payload };
    }
    return payload;
  }
});
