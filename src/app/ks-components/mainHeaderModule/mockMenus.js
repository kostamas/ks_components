const distributions_supplierManagement = {
  items: [
    {name: 'donec justo nonummy', link: ''},
    {name: 'Lorem ipsum dolor sit amet', link: ''},
    {name: 'fermentum rhoncus nam,', link: ''},
    {name: 'justo erat libero quisque', link: ''},
    {name: 'pellentesque consectetue', link: ''},
    {name: 'Sociis ornare', link: ''},
    {name: 'nonummy hendre', link: ''},
    {name: 'Cum ac nonummy', link: ''},
    {name: 'Enim at ante aliquam', link: ''},
    {name: 'donec justo nonummy', link: ''},
    {name: 'Lorem ipsum dolor sit amet', link: ''},
    {name: 'fermentum rhoncus nam,', link: ''},
    {name: 'justo erat libero quisque', link: ''},
    {name: 'pellentesque consectetue', link: ''},
    {name: 'Sociis ornare', link: ''},
    {name: 'nonummy hendre', link: ''},
    {name: 'Cum ac nonummy', link: ''},
    {name: 'Enim at ante aliquam', link: ''},
    {name: 'donec justo nonummy', link: ''},
    {name: 'Lorem ipsum dolor sit amet', link: ''},
    {name: 'fermentum rhoncus nam,', link: ''},
    {name: 'justo erat libero quisque', link: ''},
    {name: 'pellentesque consectetue', link: ''},
    {name: 'Sociis ornare', link: ''},
    {name: 'nonummy hendre', link: ''},
    {name: 'Cum ac nonummy', link: ''},
    {name: 'Enim at ante aliquam', link: ''},
    {name: 'donec justo nonummy', link: ''},
    {name: 'Lorem ipsum dolor sit amet', link: ''},
    {name: 'fermentum rhoncus nam,', link: ''},
    {name: 'justo erat libero quisque', link: ''},
    {name: 'pellentesque consectetue', link: ''},
    {name: 'Sociis ornare', link: ''},
    {name: 'nonummy hendre', link: ''},
    {name: 'Cum ac nonummy', link: ''},
    {name: 'Enim at ante aliquam', link: ''}
  ],
  title: 'donec justo nonummy'
};

const distributions_hotel = {
  items: [
    {name: 'nonummy hendreri', link: ''},
    {name: 'nonummy hendreri ', link: ''},
    {name: 'aliquam turpis', link: ''},
    {name: 'aliquam turpis', link: ''},
    {name: 'Ligula elit netus', link: ''},
  ],
  title: 'Husto'
};

const distributions_HSI_MaxiRoom_Users_Maintenance = {
  items: [
    {name: 'pellentesque', link: ''},
    {name: 'adipiscing', link: ''},
    {name: 'molestie', link: ''},
    {name: 'molestie', link: ''},
  ],
  title: 'pellentesque turpis'
};

const distributions_administration = {
  items: [
    {name: 'molestie', link: '', title: 'adipiscing'},
    {name: 'adipiscing', link: '', title: 'fermentum rhoncus'},
    {name: 'nonummy', link: '', title: 'molestie'}
  ],
  title: 'Tum rhoncu'
};

/////////////////////////////////////////////////////////////////////

const clients_clientManagement = {
  items: [
    {name: 'fermentum', link: ''},
    {name: 'ibero quisque', link: ''},
    {name: 'molestie', link: ''},
    {name: 'ermentum rhoncu', link: ''}
  ],
  title: 'Fermentum'
};

const clients_credentials = {
  items: [
    {name: 'ermentum rhoncu', link: ''}
  ],
  title: 'Phasellus vestibulum'
};

const clients_Molestie = {
  items: [
    {name: 'Molestie', link: ''}
  ],
  title: 'Molestie'
};

module.exports = [
  {
    name: 'Malesuada nunc',
    icon: 'trash_quarantine-icon',
    items: [
      {
        name: 'Hymenaeos',
        items: [distributions_administration, distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_hotel]
      },
      {
        name: 'Rhoncus',
        items: [clients_credentials, clients_Molestie, clients_clientManagement]
      },
      {
        name: 'Vestibulum',
        items: [distributions_HSI_MaxiRoom_Users_Maintenance, distributions_hotel, distributions_supplierManagement, distributions_administration]
      }],
  }
  ,{
  name: 'Phasellus vestibulum',
  icon: 'Phasellus-icon',
  items: [{name: 'Rhoncus', items: [clients_clientManagement, clients_credentials, clients_Molestie]},
    {
      name: 'Porttitor',
      items: [distributions_hotel, distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration]
    },
    {
      name: 'Hymenaeos',
      items: [distributions_supplierManagement, distributions_administration, distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance]
    }]
},
  {
    name: 'Rhoncus',
    icon: 'Rhoncus-icon',
    items: [
      {
        name: 'Hymenaeos',
        items: [distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration, distributions_hotel]
      },
      {
        name: 'Rhoncus',
        items: [clients_clientManagement, clients_credentials, clients_Molestie]
      },
      {
        name: 'Porttitor',
        items: [distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration, distributions_supplierManagement]
      }],
  }, {
    name: 'Inceptos',
    icon: 'Inceptos-icon',
    items: [
      {
        name: 'Hymenaeos',
        items: [distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration, distributions_supplierManagement]
      },
      {
        name: 'Porttitor',
        items: [distributions_supplierManagement, distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration]
      },
      {
        name: 'Aliquam',
        items: [clients_clientManagement, clients_credentials, clients_Molestie]
      }]
  },
  {
    name: 'Lorem',
    icon: 'Lorem-icon',
    items: [{
      name: 'Porttitor',
      items: [distributions_hotel, distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration]
    }, {
      name: 'Aliquam',
      items: [clients_clientManagement, clients_credentials, clients_Molestie]
    },
      {
        name: 'Hymenaeos',
        items: [distributions_supplierManagement, distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration]
      }]
  },
  {
    name: 'Vestibulum',
    icon: 'Vestibulum-icon',
    items: [
      {
        name: 'Hymenaeos',
        items: [distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_hotel, distributions_administration]
      },
      {
        name: 'Rhoncus',
        items: [clients_clientManagement, clients_credentials, clients_Molestie]
      },
      {
        name: 'Porttitor',
        items: [distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration, distributions_supplierManagement]
      }],
  },
  {
    name: 'Phasellus',
    icon: 'Phasellus-icon',
    items: [
      {
        name: 'Hymenaeos',
        items: [distributions_administration, distributions_supplierManagement, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_hotel]
      },
      {
        name: 'Rhoncus',
        items: [clients_credentials, clients_Molestie, clients_clientManagement]
      },
      {
        name: 'Porttitor',
        items: [distributions_HSI_MaxiRoom_Users_Maintenance, distributions_hotel, distributions_supplierManagement, distributions_administration]
      }],
  },
  {
    name: 'Blandit',
    icon: 'Blandit-icon',
    items: [
      {
        name: 'Porttitor',
        items: [distributions_supplierManagement, distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration]
      },
      {
        name: 'Aliquam',
        items: [clients_clientManagement, clients_credentials, clients_Molestie]
      },
      {
        name: 'Hymenaeos',
        items: [distributions_hotel, distributions_HSI_MaxiRoom_Users_Maintenance, distributions_administration, distributions_supplierManagement]
      }]
  }
];
