export const cleanResDataPurchases = {
    ref: true,
    id: true,
    name: true,
    status: true,
    price: true,
    commandDate: true,
    deliveryDate: true,
    project: {id:true, users: {id: true}, owner: {id: true}}
  }

export const cleanResDataPurchaseForDel = {
    id: true,
    project: {id: true, owner: {id: true}}
}