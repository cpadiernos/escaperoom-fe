<template>
  <div class="small-container">
    <h1>{{ game.name }}</h1>
    <!--<input type="text" />-->
    <!--<button>Send Hint</button>-->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Hints</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="puzzle in puzzles" :key="puzzle.id">
          <td>{{ puzzle.name }}</td>
          <td>{{ puzzle.code }}</td>
          <td>
              <span v-for="hint in puzzle.hints" :key="hint.id">{{ hint.text }}<br/></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'hint-portal',
  props: {
    game: Object,
  },
  data() {
    return {
      puzzles: []
    }
  },
  mounted() {
    this.getPuzzles()
  },
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
        let new_key = caseConverter(key);
        if (new_key != key) {
          obj[new_key] = obj[key];
          delete obj[key];
        }
      }
    },
    async getPuzzles() {
      try {
        const response = await fetch('http://127.0.0.1:5000' + this.game.links.self )
        const data = await response.json()
        data.puzzles.forEach( async puzzle => {
          this.convertKeyCase(puzzle, this.snakeToCamel)
          const response = await fetch('http://127.0.0.1:5000' + puzzle.links.self )
          const data = await response.json()
          this.puzzles = [...this.puzzles, data]
        })
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style scoped>
</style>