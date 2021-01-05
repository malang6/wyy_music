/**
 * 主播电台相关请求
 */
import axios from '@utils/axios'
// 电台分类
export const cateList = () => axios.get('/dj/catelist')
// 获取推荐节目
export const recommond = () => axios.get('/dj/recommend')
// 获取节目榜
export const getTopList = (limit) =>
  axios.get(`/dj/program/toplist?limit=${limit}`)
// 获取分类电台推荐
export const recommondType = (type, limit) =>
  axios.get(`/dj/recommend/type?type=${type}&limit=${limit}`)
// 类别热门电台
export const getHotTypeRadio = (cateId, limit, offset = 0) =>
  axios.get(`/dj/radio/hot?cateId=${cateId}&limit=${limit}&offset=${offset}`)
// 新晋电台榜
export const newTopList = (type, limit, offset = 0) =>
  axios.get(`/dj/toplist?type=${type}&limit=${limit}&offset=${offset}`)
