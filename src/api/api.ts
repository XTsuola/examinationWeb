import request from "../utils/request"

// 登录
export function login(data: any) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

// 获取题库
export function getList() {
    return request({
        url: '/getList',
        method: 'get',
    })
}

// 获取当前试卷
export function getPaper(data: any) {
    return request({
        url: '/getPaper',
        method: 'get',
        params: data
    })
}

// 获取分数结果
export function getScore(data: any) {
    return request({
        url: '/getScore',
        method: 'post',
        data: data
    })
}

// 获取试卷列表
export function paperList() {
    return request({
        url: '/paperList',
        method: 'get',
    })
}

// 修改试卷
export function updatePaper(data: any) {
    return request({
        url: '/updatePaper',
        method: 'post',
        data: data
    })
}

// 新增试卷
export function addPaper(data: any) {
    return request({
        url: '/addPaper',
        method: 'post',
        data: data
    })
}

// 删除试卷
export function deletePaper(data: any) {
    return request({
        url: '/deletePaper',
        method: 'get',
        params: data
    })
}

// 新增试题
export function addSubject(data: any) {
    return request({
        url: '/addSubject',
        method: 'post',
        data: data
    })
}

// 获取用户信息
export function getUserInfo(data: any) {
    return request({
        url: '/getUserInfo',
        method: 'get',
        params: data
    })
}

// 获取用户试卷
export function getUserPaper(data: any) {
    return request({
        url: '/getUserPaper',
        method: 'get',
        params: data
    })
}

// 获取所有学生试卷情况
export function studentsPaperList() {
    return request({
        url: '/getStudentsPaper',
        method: 'get'
    })
}

// 给用户新增关联试卷
export function addUserPaper(data: any) {
    return request({
        url: '/addUserPaper',
        method: 'post',
        data: data
    })
}

// 获取剩余考卷
export function getOtherPaper(data: any) {
    return request({
        url: '/getOtherPaper',
        method: 'post',
        data: data
    })
}

// 修改考卷
export function updateUserPaper(data: any) {
    return request({
        url: '/updateUserPaper',
        method: 'post',
        data: data
    })
}

// 新增考生
export function addStudent(data: any) {
    return request({
        url: '/addStudent',
        method: 'post',
        data: data
    })
}

// 修改考生
export function updateStudent(data: any) {
    return request({
        url: '/updateStudent',
        method: 'post',
        data: data
    })
}

// 修改头像
export function updateImg(data: any) {
    return request({
        url: '/updateImg',
        method: 'post',
        data: data
    })
}

// 添加视频
export function addVideo(data: any) {
    return request({
        url: '/addVideo',
        method: 'post',
        data: data
    })
}

// 添加图片
export function addImg(data: any) {
    return request({
        url: '/addImg',
        method: 'post',
        data: data
    })
}

// 删除答卷
export function deleteReport(data: any) {
    return request({
        url: '/deleteReport',
        method: 'get',
        params: data
    })
}

//addWork
export function addWork(data: any) {
    return request({
        url: '/addWork',
        method: 'post',
        data: data
    })
}
