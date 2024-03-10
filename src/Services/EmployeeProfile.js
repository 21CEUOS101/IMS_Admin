import { createAdmin, getAdminById, updateAdmin } from "./AdminService";
import { createCustomer, getCustomerById, updateCustomer } from "./CustomerService";
import { createDeliveryMan, getDeliveryManById, updateDeliveryMan } from "./DeliveryManService";
import { createSupplier, getSupplierById, updateSupplier } from "./SupplierService";
import { createWManager, getWManagerById, updateWManager } from "./WManagerService";

export async function getEmployeeById(id) {
    
    if(id === null) return { success: false , message: "Invalid Id"};

    let data = null;
    
    if (id[0] === "a") {
        data = await getAdminById(id);
    }
    else if (id[0] === "d") {
        data = await getDeliveryManById(id);
    }
    else if (id[0] === "s") {
        data = await getSupplierById(id);
    }
    else if (id[0] === "m") {
        data = await getWManagerById(id);
    }
    else if (id[0] === "c") {
        data = await getCustomerById(id);
    }

    return { ...data , success: true};

}

// create employee 
export async function createEmployee(values) {
    
    let data = null;
    
    if (values.role === "admin") {
        data = await createAdmin(values);
    }
    else if (values.role === "deliveryman") {
        data = await createDeliveryMan(values);
    }
    else if (values.role === "supplier") {
        data = await createSupplier(values);
    }
    else if (values.role === "wmanager") {
        data = await createWManager(values);
    }
    else if (values.role === "customer") {
        data = await createCustomer(values);
    }
    console.log(data);

    if(data === null) return { success: false , message: "Invalid Role"};

    return { ...data , success: true};

}

export async function updateEmployeeById(id , values) {
    
    if(id === null) return null;
    
    let data = null;
    
    if (id[0] === "a") {
        data = await updateAdmin(values , id);
    }
    else if (id[0] === "d") {
        data = await updateDeliveryMan(values , id);
    }
    else if (id[0] === "s") {
        data = await updateSupplier(values ,id);
    }
    else if (id[0] === "m") {
        data = await updateWManager(values ,id);
    }
    else if (id[0] === "c") {
        data = await updateCustomer(values ,id);
    }
    console.log(data);
    return data;

}

export async function updateAdminProfile(employee, id) {

    let data = null;
    data = await updateAdmin(employee, id);

    return data;

}