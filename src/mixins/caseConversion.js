export default {
  methods: {
    snakeToCamel(str) {
      return str.replace(/_[a-z]/g, function(regexMatch) {
        if (str.indexOf(regexMatch) == 0) {
          return regexMatch[1];
        } else {
          return regexMatch[1].toUpperCase();
        }
      });
    },
    camelToSnake(str) {
      return str.replace(/[A-Z]/g, function(regexMatch) {
        return "_" + regexMatch.toLowerCase();
      });
    },
    convertKeyCase(obj, caseConverter) {
      for (var key of Object.keys(obj)) {
        let newKey = caseConverter(key);
        if (newKey != key) {
          obj[newKey] = obj[key];
          delete obj[key];
        }
      }
    },
  }
}