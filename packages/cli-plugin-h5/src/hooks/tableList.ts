import { ref, reactive } from 'vue'

export default function () {
  const pager = reactive({
    pageNo: 1,
    pageSize: 20,
    lastLength: 0,
    query: (type?:number): void => {
      console.log('请重新定义query函数')
    }
  })
  const loader = reactive({
    loading: false,
    loadAll: true,
    nodata: false,
    loadMore: () => {
      if (loader.loading) { return }
      if (pager.lastLength === pager.pageSize || pager.pageNo === 1) { pager.pageNo++; pager.query() }
    }
  })
  const queryParam = reactive<any>({})
  const listData = ref<any>([])

  return { pager, loader, queryParam, listData }
}
