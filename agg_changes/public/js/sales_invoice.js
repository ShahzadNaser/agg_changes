frappe.ui.form.on('Sales Invoice', {
    size: function(frm){
        frm.doc.items.forEach((item) => {
            frm.events.calculate_sqft(frm,item);
        });        
    },
    calculate_sqft: function(frm,item){
        var width = 0;
        var length = 0;
        var sft = 0;
        var standard_size = item.size || frm.doc.size;
        if(item.g_width){
            width = item.g_width + flt((item.g_width%standard_size > 0)? standard_size-item.g_width%standard_size:0);
        }
        if(item.length){
            length = item.length + flt((item.length%standard_size > 0)? standard_size-item.length%standard_size:0);
        }
        if(length>0 && width>0){
            sft = flt(length*width/144 * item.g_qty);   
        }
        console.log(standard_size, width, length, sft);
        if(!item.size)
            frappe.model.set_value(item.doctype, item.name,"size",standard_size);    

        frappe.model.set_value(item.doctype, item.name,"standard_width",width);    
        frappe.model.set_value(item.doctype, item.name,"standard_length",length);

        frappe.model.set_value(item.doctype, item.name,"qty",sft);
    }
});
frappe.ui.form.on('Sales Invoice Item', {
	g_width: function(frm,cdt, cdn) {
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
        // var width = 0;
        // var length = 0;
        // var sft = 0;
        // var standard_size = item.size || frm.doc.size;
        // if(item.g_width){
        //     width = item.g_width + flt((item.g_width%standard_size > 0)? standard_size-item.g_width%standard_size:0);
        // }
        // if(item.length){
        //     length = item.length + flt((item.length%standard_size > 0)? standard_size-item.length%standard_size:0);
        // }
        // if(length>0 && width>0){
        //     sft = flt(length*width/144 * item.g_qty);   
        // }

        // if(!item.size)
        //     frappe.model.set_value(item.doctype, item.name,"size",standard_size);    

        // frappe.model.set_value(item.doctype, item.name,"standard_width",width);    
        // frappe.model.set_value(item.doctype, item.name,"standard_length",length);

        // frappe.model.set_value(item.doctype, item.name,"qty",sft);
    },
    length: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    g_qty: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    },
    size: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        frm.events.calculate_sqft(frm,item);
    }
});