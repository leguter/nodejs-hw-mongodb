export const calculatePaginationData = ({totalItems,page, perPage}) => {
    const totalPages = Math.ceil(totalItems/perPage)
return {
    page,
    perPage,
    totalItems,
    totalPages
}
}