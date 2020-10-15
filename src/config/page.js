export const pagination = {
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showLessItems: true,
    size: 'small',
    showTotal: (total) => {
        return `共 ${total} 条`
    }
}