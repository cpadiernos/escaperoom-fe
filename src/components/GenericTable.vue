<template>
  <div id="table">
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{changeToColumnHeader(column)}}</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(column, colIndex) in columns" :key="colIndex">{{item[column]}}</td>
          <td>
            <button
              @click="openEditModal(item)"
            >
              Edit
            </button>
          </td>
          <td>
            <button class="btn-red"
              @click="openDeleteModal(item)"
            >
              Delete
            </button>
          </td>
          <td>
            <router-link 
              v-for="(subItem, index) in subItems"
              :key="index"
              class="nav-link"
              :to="{name: createPathName(itemType, subItem), params: {itemId: item.id, itemName: item.name, itemType: itemType}}"
            >
              View {{subItem}}<br/>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'generic-table',
    data() {
      return {
        columns: [],
      }
    },
    props: {
      items: Array,
      itemType: String,
      subItems: Array,
    },
    watch: {
      items: function(newVal) {
        if (newVal && newVal.length) {
          this.setColumns(newVal)
        }
      }
    },
    methods: {
      createPathName(itemType, subItem) {
        const pathName = 'admin-' + itemType + '-' + subItem
        return pathName
      },
      setColumns(items) {
        let itemKeys = Object.keys(items[0])
        const notNeededKeys = ['links']
        itemKeys = itemKeys.filter((key) => (
          notNeededKeys.indexOf(key) === -1
          && !Array.isArray(items[0][key])))
        this.columns = itemKeys
      },
      changeToColumnHeader(name) {
        const sentence = name.replace(/([A-Z])/g, ' $1')
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
      },
      openEditModal(item) {
        this.$emit('open:edit', item)
      },
      openDeleteModal(item) {
        this.$emit('open:delete', item)
      },
    },
  }
</script>

<style scoped>
  .btn-red {
    color: white;
    background: #ee2603;
    border: 1px solid #ee2603;
  }
  
  .btn-red:hover {
    background: #d52203;
    border: 1px solid #d52203;
  }
</style>