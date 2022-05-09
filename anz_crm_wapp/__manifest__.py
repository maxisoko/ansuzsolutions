{
    "name": "CRM Link WhatsApp - Ansuz Solutions",
    "summary": "CRM Link WhatsApp",
    "author": "Ansuz Solutions",
    "website": "https://www.ansuzsolutions.com/",
    "category": "",
    "version": "1.0.1",
    "license": 'LGPL-3',
    "assets": {
        'web.assets_backend': {
            '/anz_crm_wapp/static/src/css/fields_crm_wapp_widget.css',
        }
    },
    'depends': [
        'anz_wapp', 'crm'
    ],
    'data': [
        'views/crm_lead_views_inherit.xml',
    ]
}

