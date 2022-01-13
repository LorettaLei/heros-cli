import { postAction } from '@/utils/request'
import { HomeRequestModel } from '@/model/home'
const api = {
  home: '/api'
}
export function getHomeDetail (params: HomeRequestModel):Promise<any> {
  return postAction(api.home, params)
}
