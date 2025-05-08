export const hasPermission = (moduleName, type) => {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
    const module = permissions.find(p => p.permission_name === moduleName);
  
    if (!module) return false;
  
    if (type === "view") return module.view_permission === 1;
    if (type === "add") return module.add_permission === 1;
    if(type==="edit")  return module.edit_permission===1;
    if(type==="delete") return module.delete_permission===1;


    return false;
  };
  