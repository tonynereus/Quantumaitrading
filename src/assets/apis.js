// const base = "http://localhost:5000/";
const base = "https://apis.elonmuskreeve.com/" ;

const apis = {
    base: base,
    mail:"admin@gmail.com",
    signup:base+"user/signup",
    signin:base+"user/signin",
    getPlans:base+"user/get-plans",
    createInvestment:base+"user/investments",
    getInvestments:base+"user/active-investments",
    getAllDeposits:base+"admin/get-deposits",
    getAllPaymentMethods:base+"admin/get-payment-methods",
    updateUser:base+"admin/update-user",
    updatePaymentMethods:base+"admin/update-payment-methods",
    getDeposits:base+"user/deposits",
    getWithdraw:base+"user/withdraw",
    login: base + "office/signin/",
    getCategories:base+"getcategories",
    getTransactions: base + "admin/transactions",
    confirmTransaction: base + "admin/transaction/confirm",
    denyTransaction: base + "admin/transaction/deny",
    getUsers: base + "admin/getusers",
    getStat: base + "admin/stats",
    getOrders: base + "admin/getorders",
    viewOrder: base + "admin/orders/",
    confirmOrder: base + "admin/confirmOrder",
    confirmDispatch: base + "admin/confirm-dispatch",
    getRoles: base + "admin/getroles",
    createUser:base+"admin/createAdmin",
    getAdmins:base+"admin/getAdminUsers",
    deactivateAdmin:base+"admin/deactivateAdmin",
    deleteAdmin:base+"admin/deleteAdmin",
    uploadBanner:base+"admin/upload-banners",
   
    addBlog:base+"admin/addBlog",
    deleteBlog:base+"admin/deleteBlog",
    editBlog:base+"admin/editBlog",
    categoryBanner:base+"admin/update-category-banner",
    addCollection:base+"admin/addCollection",
    getProductsForCollection:base+"admin/getCategoryProductsWithCollectionStatus",
    addToCollection:base+"admin/collection-product/add",
    removeFromCollection:base+"admin/collection-product/remove",
    deleteCollection:base+"admin/collection/delete"
}

export default apis;