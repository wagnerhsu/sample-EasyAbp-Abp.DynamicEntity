$(function () {

    var l = abp.localization.getResource('DynamicSample');

    var service = easyAbp.abp.dynamic.dynamicEntities.dynamicEntity;
    var createModal = new abp.ModalManager(abp.appPath + 'Computers/Computer/CreateModal');
    var editModal = new abp.ModalManager(abp.appPath + 'Computers/Computer/EditModal');

    var dataTable = $('#ComputerTable').DataTable(abp.libs.datatables.normalizeConfiguration({
        processing: true,
        serverSide: true,
        paging: true,
        searching: true,
        autoWidth: false,
        scrollCollapse: true,
        order: [[0, "asc"]],
        ajax: abp.libs.datatables.createAjax(service.getList),
        columnDefs: [
            {
                rowAction: {
                    items:
                        [
                            {
                                text: l('Edit'),
                                action: function (data) {
                                    editModal.open({id: data.record.id});
                                }
                            },
                            {
                                text: l('Delete'),
                                confirmMessage: function (data) {
                                    return l('ComputerDeletionConfirmationMessage', data.record.id);
                                },
                                action: function (data) {
                                    service.delete(data.record.id)
                                        .then(function () {
                                            abp.notify.info(l('SuccessfullyDeleted'));
                                            dataTable.ajax.reload();
                                        });
                                }
                            }
                        ]
                }
            },
            {
                title: 'CPU',
                data: "extraProperties.CPU"
            },
            {
                title: 'Price',
                data: "extraProperties.Price"
            },
        ]
    }));

    createModal.onResult(function () {
        dataTable.ajax.reload();
    });

    editModal.onResult(function () {
        dataTable.ajax.reload();
    });

    $('#NewComputerButton').click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});