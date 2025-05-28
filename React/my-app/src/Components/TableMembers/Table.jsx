
// import React, { useState, useEffect, useRef } from 'react';
// import { classNames } from 'primereact/utils';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { ProductService } from './ProductService';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
// import AxiosDeleteMember from '../DeleteMember/AxiosDeleteMember';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import AxiosUpdateMember from '../UpdateMember/AxiosUpdateMember ';
// import CreateNewMember from '../AddMembers/CreatNewMember';
// import '../../CSS/Table.css';
// import AxiosGetAdministratorIdByMember from '../GetAllSecurityCameras/AxiosGetAdministratorIdByMember';
// import AxiosGetUserById from '../ControlPanel/AxiosGetUserById';
// import HasPermission from '../AddMembers/hasPermission';


// const Table = () => {
//     let emptyProduct = {
//         AccessPermissions: [],
//         administartorID: '',
//         arrAnalysisSchema: [],
//         arrSecurityCameras: [],
//         email: null,
//         name: " ",
//         password: null,
//         phone: null,
//         role: 'Member',
//         _id: '',
//     };


//     const [products, setProducts] = useState();
//     const [productDialog, setProductDialog] = useState(false);
//     const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//     const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//     const [product, setProduct] = useState(emptyProduct);
//     const [selectedProducts, setSelectedProducts] = useState(null);
//     const [submitted, setSubmitted] = useState(false);
//     const [globalFilter, setGlobalFilter] = useState(null);
//     const [error, setError] = useState(null);
//     const toast = useRef(null);
//     const dt = useRef(null);
//     const token = localStorage.getItem("token");  // קבלת ה-TOKEN מה-localStorage
//     const user = useSelector((state) => state.UserSlice);
//     const [fullUser, setFullUser] = useState(null); // 
//     const [arrPermitions, setArrPermitions] = useState([]);
//     const [adminId, setAdminId] = useState([])


//     useEffect(() => {
//         const fetchAdminId = async () => {
//             if (user.role !== "Member") {
//                 setAdminId(user._id);
//             } else if (user?._id) {
//                 try {
//                     const data = await AxiosGetUserById(user._id);
//                     setAdminId(data.user.administartorID);
//                     setFullUser(data.user);
//                     setArrPermitions(data.user.AccessPermissions);
//                     // console.log("arrPermitions---------"+arrPermitions)
//                     // console.log(data.user.AccessPermissions)
//                     // const isButtonDisabled = !HasPermission("add security", arrPermitions, user.role);
//                     // console.log(isButtonDisabled)

//                 } catch (err) {
//                     console.error("שגיאה בקבלת פרטי המשתמש:", err);
//                     setError("שגיאה בטעינת פרטי המשתמש.");
//                 }
//             }
//         };

//         fetchAdminId();
//     }, [user]);
//     const [isCanAddMember, setIsCanAddMember] = useState(true)
//     const [isCanEditMember, setIsCanEditMember] = useState(true);
//     const [isCanDeleteMember, setIsCanDeleteMember] = useState(true);


//     useEffect(() => {
//         console.log("arrPermitions updated:", arrPermitions);
//         setIsCanAddMember(HasPermission("add member", arrPermitions, user.role));
//         setIsCanEditMember(HasPermission("edit member", arrPermitions, user.role));
//         setIsCanDeleteMember(HasPermission("delete member", arrPermitions, user.role));
//         //setIsCanAddMember(HasPermission("edit member", arrPermitions, user.role)); 
//         //console.log(isButtonDisabled);
//     }, [arrPermitions, user.role]);
//     console.log(isCanAddMember);


//     useEffect(() => {
//         if (adminId) {
//             ProductService.getProducts(adminId).then((data) => {
//                 console.log('products from server:', data);
//                 setProducts(data);
//             });
//         }
//     }, [adminId]);




//     const formatCurrency = (value) => {
//         return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//     };
//     const [showAddEmployee, setShowAddEmployee] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const openNew = () => {
//         if (isCanAddMember) {
//             setShowAddEmployee(true);
//             setProduct(emptyProduct);
//             setSubmitted(false);
//             //setProductDialog(true);
//             console.log('openNew', product);
//         }
//     };
//     const refreshProducts = async () => {
//         const data = await ProductService.getProducts(adminId);
//         setProducts(data);
//     };

//     const hideDialog = () => {
//         setSubmitted(false);
//         setProductDialog(false);
//     };

//     const hideDeleteProductDialog = () => {
//         setDeleteProductDialog(false);
//     };

//     const hideDeleteProductsDialog = () => {
//         setDeleteProductsDialog(false);
//     };

//     const saveProductHandler = async () => {
//         setSubmitted(true);
//         if (product.name.trim()) {
//             try {
//                 const response = await AxiosUpdateMember(product, user, token);
//                 if (response.status === 200) {
//                     toast.current.show({
//                         severity: 'success',
//                         summary: 'Successful',
//                         detail: 'Product Updated',
//                         life: 3000
//                     });
//                     await ProductService.getProducts(adminId).then((data) => setProducts(data));
//                     setProductDialog(false); // ✅ סוגר את הדיאלוג
//                     setProduct(emptyProduct); // מאפס את הטופס
//                 }
//             } catch (error) {
//                 toast.current.show({
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: 'Failed to update product',
//                     life: 3000
//                 });
//             }
//         }
//     };
//     const editProduct = (product) => {
//         if (isCanEditMember) {
//             setProduct({ ...product });
//             setProductDialog(true);
//         }
//     };

//     const confirmDeleteProduct = (product) => {
//         setProduct(product);
//         setDeleteProductDialog(true);
//     };

//     const deleteProduct = () => {
//         let _products = products.filter((val) => val._id !== product._id);

//         setProducts(_products);
//         setDeleteProductDialog(false);
//         setProduct(emptyProduct);
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//     };

//     const exportCSV = () => {
//         dt.current.exportCSV();
//     };

//     const confirmDeleteSelected = () => {
//         setDeleteProductsDialog(true);
//     };

//     const deleteSelectedProducts = () => {
//         let _products = products.filter((val) => !selectedProducts.includes(val));

//         setProducts(_products);
//         setDeleteProductsDialog(false);
//         setSelectedProducts(null);
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
//     };

//     const onCategoryChange = (e) => {
//         let _product = { ...product };

//         _product['category'] = e.value;
//         setProduct(_product);
//     };

//     const onInputChange = (e, name) => {
//         let val = e.target?.value !== undefined ? e.target.value : e.value;

//         setProduct((prevProduct) => {
//             return {
//                 ...prevProduct,
//                 [name]: val
//             };
//         });
//     };
//     const onInputNumberChange = (e, name) => {
//         const val = e.value || 0;
//         let _product = { ...product };

//         _product[`${name}`] = val;

//         setProduct(_product);
//     };
//     const leftToolbarTemplate = () => {
//         return (
//             <div className="flex flex-wrap gap-2">
//                 <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className='btn-ex' />
//             </div>
//         );
//     };
//     const rightToolbarTemplate = () => {
//         return <Button label="Export" icon="pi pi-upload" severity="success" onClick={exportCSV} className='btn-ex' />;
//     };
//     const imageBodyTemplate = (rowData) => {
//         return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
//     };
//     const priceBodyTemplate = (rowData) => {
//         return formatCurrency(rowData.name);
//     };
//     const ratingBodyTemplate = (rowData) => {
//         return <Rating value={rowData.rating} readOnly cancel={false} />;
//     };
//     const statusBodyTemplate = (rowData) => {
//         return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
//     };
//     const actionBodyTemplate = (rowData) => {
//         return (
//             <React.Fragment>
//                 <Button
//                     icon="pi pi-pencil"
//                     rounded
//                     outlined
//                     className="mr-2"
//                     onClick={() => isCanEditMember && editProduct(rowData)}
//                     style={{
//                         opacity: isCanEditMember ? 1 : 0.3,
//                         pointerEvents: isCanEditMember ? 'auto' : 'none',
//                         cursor: isCanEditMember ? 'pointer' : 'default'
//                     }}
//                 />

//                 <Button
//                     icon="pi pi-trash"
//                     rounded
//                     outlined
//                     severity="danger"
//                     onClick={() => confirmDeleteProduct(rowData)}
//                     disabled={!isCanDeleteMember}
//                 />
//             </React.Fragment>
//         );
//     };
//     const getSeverity = (product) => {
//         switch (product.inventoryStatus) {
//             case 'INSTOCK':
//                 return 'success';

//             case 'LOWSTOCK':
//                 return 'warning';

//             case 'OUTOFSTOCK':
//                 return 'danger';

//             default:
//                 return null;
//         }
//     };

//     const header = (
//         <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//             <h4 className="m-0">Manage Products</h4>
//             <IconField iconPosition="left">
//                 <InputIcon className="pi pi-search" />
//                 <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
//             </IconField>
//         </div>
//     );
//     const productDialogFooter = (
//         <React.Fragment>
//             <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
//             <Button label="Save" icon="pi pi-check" onClick={saveProductHandler} />
//         </React.Fragment>
//     );
//     const deleteProductDialogFooter = (
//         <React.Fragment>
//             <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
//             <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
//         </React.Fragment>
//     );
//     const deleteProductsDialogFooter = (
//         <React.Fragment>
//             <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
//             <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
//         </React.Fragment>
//     );

//     return (
//         <div>
//             <CreateNewMember
//                 visible={showAddEmployee}
//                 onClose={() => setShowAddEmployee(false)}
//             />

//             <Toast ref={toast} />
//             <div className="card">
//                 <Toolbar className="mb-4 custom-toolbar" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

//                 <DataTable className="custom-dark-table" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}

//                     dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
//                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
//                     <Column selectionMode="multiple" exportable={false}></Column>
//                     <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
//                     <Column field="phone" header="Phone" sortable style={{ minWidth: '16rem' }}></Column>
//                     <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
//                     <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
//                 </DataTable>

//             </div>

//             <Dialog
//                 visible={productDialog}
//                 //disabled={isCanAddMember}
//                 style={{ width: '32rem' }}
//                 breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//                 header="Memberr Details"
//                 modal
//                 className="p-fluid"
//                 footer={productDialogFooter}
//                 onHide={hideDialog}
//             >
//                 {product.image && (
//                     <img
//                         src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
//                         alt={product.image}
//                         className="product-image block m-auto pb-3"
//                     />
//                 )}

//                 {/* Name */}
//                 <div className="field">
//                     <label htmlFor="name" className="font-bold">Name</label>
//                     <InputText
//                         id="name"
//                         value={product.name || ''}
//                         onChange={(e) => onInputChange(e, 'name')}
//                         required
//                         autoFocus
//                         className={classNames({ 'p-invalid': submitted && !product.name })}
//                     />
//                     {submitted && !product.name && (
//                         <small className="p-error">Name is required.</small>
//                     )}
//                 </div>

//                 {/* Email */}
//                 <div className="field">
//                     <label htmlFor="email" className="font-bold">Email</label>
//                     <InputText
//                         id="email"
//                         value={product.email || ''}
//                         onChange={(e) => onInputChange(e, 'email')}
//                         required
//                         className={classNames({ 'p-invalid': submitted && !product.email })}
//                     />
//                     {submitted && !product.email && (
//                         <small className="p-error">Email is required.</small>
//                     )}
//                 </div>

//                 <div className="field">
//                     <label htmlFor="phone" className="font-bold">Phone</label>
//                     <InputNumber
//                         id="phone"
//                         value={product.phone || ''}
//                         onValueChange={(e) => onInputNumberChange(e, 'phone')}
//                         mode="decimal"
//                         locale="en-US"
//                     />
//                 </div>

//                 {/* Permissions */}
//                 <div className="field">
//                     <label className="font-bold mb-3">Permissions</label>
//                     <div className="formgrid grid">
//                         {product.AccessPermissions?.map((perm, index) => (
//                             <div key={perm._id || index} className="col-12 flex align-items-center mb-2">
//                                 <Button
//                                     icon={perm.isPermissions ? 'pi pi-check-circle' : 'pi pi-circle-off'}
//                                     className={`p-button-rounded p-button-sm me-2 ${perm.isPermissions ? 'p-button-success' : 'p-button-secondary'}`}
//                                     onClick={() => {

//                                         const updatedPermissions = [...product.AccessPermissions];
//                                         updatedPermissions[index].isPermissions = !updatedPermissions[index].isPermissions;
//                                         setProduct((prev) => ({
//                                             ...prev,
//                                             AccessPermissions: updatedPermissions
//                                         }));
//                                     }}
//                                     tooltip={perm.isPermissions ? 'Click to disable' : 'Click to enable'}
//                                     tooltipOptions={{ position: 'top' }}
//                                 />
//                                 <span>{perm.sortPermissions}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </Dialog>


//             <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
//                     {product && (
//                         <span>
//                             Are you sure you want to delete<b>{product.name}
//                                 <AxiosDeleteMember
//                                     memberId={product._id}
//                                     adminId={product.administartorID && product.administartorID.toString()}
//                                 />
//                             </b>?
//                         </span>
//                     )}
//                 </div>
//             </Dialog>

//             <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
//                     {product && <span>Are you sure you want to delete the selected products?</span>}
//                 </div>
//             </Dialog>

//         </div>


//     );
// }
// export default Table;
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProductService } from './ProductService';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import AxiosDeleteMember from '../DeleteMember/AxiosDeleteMember';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AxiosUpdateMember from '../UpdateMember/AxiosUpdateMember ';
import CreateNewMember from '../AddMembers/CreatNewMember';
import '../../CSS/Table.css';
import AxiosGetAdministratorIdByMember from '../GetAllSecurityCameras/AxiosGetAdministratorIdByMember';
import AxiosGetUserById from '../ControlPanel/AxiosGetUserById';
import HasPermission from '../AddMembers/hasPermission';


const Table = () => {
    let emptyProduct = {
        AccessPermissions: [],
        administartorID: '',
        arrAnalysisSchema: [],
        arrSecurityCameras: [],
        email: null,
        name: " ",
        password: null,
        phone: null,
        role: 'Member',
        _id: '',
    };


    const [products, setProducts] = useState();
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const token = localStorage.getItem("token");  // קבלת ה-TOKEN מה-localStorage
    const user = useSelector((state) => state.UserSlice);
    const [fullUser, setFullUser] = useState(null); // 
    const [arrPermitions, setArrPermitions] = useState([]);
    const [adminId, setAdminId] = useState([])


    useEffect(() => {
        const fetchAdminId = async () => {
            if (user.role !== "Member") {
                setAdminId(user._id);
            } else if (user?._id) {
                try {
                    const data = await AxiosGetUserById(user._id);
                    setAdminId(data.user.administartorID);
                    setFullUser(data.user);
                    setArrPermitions(data.user.AccessPermissions);
                    // console.log("arrPermitions---------"+arrPermitions)
                    // console.log(data.user.AccessPermissions)
                    // const isButtonDisabled = !HasPermission("add security", arrPermitions, user.role);
                    // console.log(isButtonDisabled)

                } catch (err) {
                    console.error("שגיאה בקבלת פרטי המשתמש:", err);
                    setError("שגיאה בטעינת פרטי המשתמש.");
                }
            }
        };

        fetchAdminId();
    }, [user]);
    const [isCanAddMember, setIsCanAddMember] = useState(true)
    const [isCanEditMember, setIsCanEditMember] = useState(true);
    const [isCanDeleteMember, setIsCanDeleteMember] = useState(true);


    useEffect(() => {
        console.log("arrPermitions updated:", arrPermitions);
        setIsCanAddMember(HasPermission("add member", arrPermitions, user.role));
        setIsCanEditMember(HasPermission("edit member", arrPermitions, user.role));
        setIsCanDeleteMember(HasPermission("delete member", arrPermitions, user.role));
        //setIsCanAddMember(HasPermission("edit member", arrPermitions, user.role)); 
        //console.log(isButtonDisabled);
    }, [arrPermitions, user.role]);
    console.log(isCanAddMember);


    useEffect(() => {
        if (adminId) {
            ProductService.getProducts(adminId).then((data) => {
                console.log('products from server:', data);
                setProducts(data);
            });
        }
    }, [adminId]);




    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openNew = () => {
        if (isCanAddMember) {
            setShowAddEmployee(true);
            setProduct(emptyProduct);
            setSubmitted(false);
            //setProductDialog(true);
            console.log('openNew', product);
        }
    };
    const refreshProducts = async () => {
        const data = await ProductService.getProducts(adminId);
        setProducts(data);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProductHandler = async () => {
        setSubmitted(true);
        if (product.name.trim()) {
            try {
                const response = await AxiosUpdateMember(product, adminId, token);
                if (response.status === 200) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Updated',
                        life: 3000
                    });
                    await ProductService.getProducts(adminId).then((data) => setProducts(data));
                    setProductDialog(false); // ✅ סוגר את הדיאלוג
                    setProduct(emptyProduct); // מאפס את הטופס
                }
            } catch (error) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update product',
                    life: 3000
                });
            }
        }
    };
    const editProduct = (product) => {
        if (isCanEditMember) {
            setProduct({ ...product });
            setProductDialog(true);
        }
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
    try {
        await AxiosDeleteMember(product._id, product.administartorID?.toString());

        const _products = products.filter((val) => val._id !== product._id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);

        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
    } catch (error) {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'מחיקה נכשלה',
            life: 3000,
        });
    }
};
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        let val = e.target?.value !== undefined ? e.target.value : e.value;

        setProduct((prevProduct) => {
            return {
                ...prevProduct,
                [name]: val
            };
        });
    };
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className='btn-ex' />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" severity="success" onClick={exportCSV} className='btn-ex' />;
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.name);
    };
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => isCanEditMember && editProduct(rowData)}
                    style={{
                        opacity: isCanEditMember ? 1 : 0.3,
                        pointerEvents: isCanEditMember ? 'auto' : 'none',
                        cursor: isCanEditMember ? 'pointer' : 'default'
                    }}
                />

                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteProduct(rowData)}
                    disabled={!isCanDeleteMember}
                />
            </React.Fragment>
        );
    };
    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" className="cancel-button" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="save-button" onClick={saveProductHandler} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
    <>
        <Button
            label="No"
            icon="pi pi-times"
            outlined
            style={{
                backgroundColor: 'white',
                borderColor: '#22c55e',
                color: '#22c55e'
            }}
            onClick={hideDeleteProductDialog}
        />
        <Button
            label="Yes"
            icon="pi pi-check"
            severity="danger"
            style={{ color: 'white' }}
            onClick={deleteProduct} // רק פה מתבצעת המחיקה בפועל
        />
    </>
);


    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <CreateNewMember
                visible={showAddEmployee}
                onClose={() => setShowAddEmployee(false)}
            />

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4 custom-toolbar" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable className="custom-dark-table" ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}

                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="phone" header="Phone" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

            </div>

            <Dialog
                visible={productDialog}
                //disabled={isCanAddMember}
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Memberr Details"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                {product.image && (
                    <img
                        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                        alt={product.image}
                        className="product-image block m-auto pb-3"
                    />
                )}

                {/* Name */}
                <div className="field">
                    <label htmlFor="name" className="font-bold">Name</label>
                    <InputText
                        id="name"
                        value={product.name || ''}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={classNames({ 'p-invalid': submitted && !product.name })}
                    />
                    {submitted && !product.name && (
                        <small className="p-error">Name is required.</small>
                    )}
                </div>

                {/* Email */}
                <div className="field">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <InputText
                        id="email"
                        value={product.email || ''}
                        onChange={(e) => onInputChange(e, 'email')}
                        required
                        className={classNames({ 'p-invalid': submitted && !product.email })}
                    />
                    {submitted && !product.email && (
                        <small className="p-error">Email is required.</small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="phone" className="font-bold">Phone</label>
                    <InputNumber
                        id="phone"
                        value={product.phone || ''}
                        onValueChange={(e) => onInputNumberChange(e, 'phone')}
                        mode="decimal"
                        locale="en-US"
                    />
                </div>

                {/* Permissions */}
                <div className="field">
                    <label className="font-bold mb-3">Permissions</label>
                    <div className="formgrid grid">
                        {product.AccessPermissions?.map((perm, index) => (
                            <div key={perm._id || index} className="col-12 flex align-items-center justify-content-between mb-2 p-2 border-round surface-100">
                                <span className="text-sm text-900">{perm.sortPermissions}</span>
                                <Button
                                    icon={perm.isPermissions ? 'pi pi-check-circle' : 'pi pi-circle-off'}
                                    className={`p-button-rounded p-button-sm p-button-outlined permission-button ${perm.isPermissions ? 'p-button-success' : 'p-button-secondary'
                                        }`}
                                    style={{ width: '1.8rem', height: '1.8rem', padding: '0' }}
                                    onClick={() => {
                                        const updatedPermissions = [...product.AccessPermissions];
                                        updatedPermissions[index].isPermissions = !updatedPermissions[index].isPermissions;
                                        setProduct((prev) => ({
                                            ...prev,
                                            AccessPermissions: updatedPermissions
                                        }));
                                    }}
                                    tooltip={perm.isPermissions ? 'Click to disable' : 'Click to enable'}
                                    tooltipOptions={{ position: 'top' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </Dialog>


            <Dialog
                visible={deleteProductDialog}
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>

        </div>


    );
}
export default Table;