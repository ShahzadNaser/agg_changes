frappe.ui.form.on('Delivery Note', {
    charge_width: function(frm){
        frm.doc.items.forEach((item) => {
            frm.events.calculate_sqft(frm,item,true);
        });        
    },
    charge_length: function(frm){
        frm.doc.items.forEach((item) => {
            frm.events.calculate_sqft(frm,item,true);
        });        
    },
    calculate_sqft: function(frm,item,override_all=false){
        var width = 0;
        var length = 0;
        var sft = 0;
        var charge_width = item.charge_width || frm.doc.charge_width;
        var charge_length = item.charge_length || frm.doc.charge_length;
        if(override_all){
            charge_width =  frm.doc.charge_width;
            charge_length = frm.doc.charge_length;
    
        }
        if(item.actual_width){
            width = item.actual_width + flt((item.actual_width%charge_width > 0)? charge_width-item.actual_width%charge_width:0);
        }
        if(item.actual_length){
            length = item.actual_length + flt((item.actual_length%charge_length > 0)? charge_length-item.actual_length%charge_length:0);
        }
        if(length>0 && width>0){
            sft = flt(length*width/144 * item.g_qty);   
        }

        console.log(charge_width, width, charge_length, length, sft, override_all);

        if(!item.charge_width || override_all)
            frappe.model.set_value(item.doctype, item.name,"charge_width",charge_width);

        if(!item.charge_length || override_all)
            frappe.model.set_value(item.doctype, item.name,"charge_length",charge_length);

        frappe.model.set_value(item.doctype, item.name,"standard_width",width);    
        frappe.model.set_value(item.doctype, item.name,"standard_length",length);

        frappe.model.set_value(item.doctype, item.name,"qty",sft);
    }
});
frappe.ui.form.on('Delivery Note Item', {
    items_add: function(frm,cdt, cdn){
		var row = frappe.get_doc(cdt, cdn);
        row.charge_width = frm.doc.charge_width;
        row.charge_length = frm.doc.charge_length;
        refresh_field("charge_width", cdn, "items");
        refresh_field("charge_length", cdn, "items");
    },
    actual_width: function(frm,cdt, cdn) {
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    actual_length: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    g_qty: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    charge_width: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    charge_length: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    }
});