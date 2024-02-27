import { getAdminById, updateAdmin } from "./AdminService";
import { getCustomerById, updateCustomer } from "./CustomerService";
import { getDeliveryManById, updateDeliveryMan } from "./DeliveryManService";
import { getSupplierById, updateSupplier } from "./SupplierService";
import { getWManagerById, updateWManager } from "./WManagerService";

export async function getEmployeeById(id) {
    
    if(id === null) return null;

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
    console.log(data);
    return data;

}

export async function updateEmployeeById(id , values) {
    
    if(id === null) return null;
    console.log(id);
    console.log("Inside updateEmployeeById");
    console.log(values);
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