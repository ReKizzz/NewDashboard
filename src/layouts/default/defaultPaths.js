import { paths } from "../../constants/paths";

export const items = [
    // {
    //     key: '0',
    //     label: 'menu_dashboard',
    //     data: 'Documents Folder',
    //     icon: 'pi pi-fw pi-desktop',
    //     url: "/dashboard"
    // },
    {
        key: '1',
        label: 'menu_category',
        url: "/category"
    },
    {
        key: '2',
        label: 'menu_role',
        url: "/role"
    },
    {
        key: '3',
        label: 'menu_user',
        url: "/user"
    },
    {
        key: 'menu_create',
        label: 'menu_create',
        children: [
            {
                key: 'menu_owners_create',
                label: 'owner',
                url: paths.ownerAccCreate
            },
            {
                key: 'menu_corners_create',
                label: 'corner',
                url: paths.cornerCreate
            },
            {
                key: 'menu_cities_create',
                label: 'city',
                url: paths.cityCreate
            },
            {
                key: 'menu_townships_create',
                label: 'township',
                url: paths.townshipCreate
            },
            {
                key: 'menu_wards_create',
                label: 'ward',
                url: paths.wardCreate
            },
            {
                key: 'menu_streets_create',
                label: 'street',
                url: paths.streetCreate
            },
            {
                key: 'menu_wifis_create',
                label: 'wifi',
                url: paths.wifiCreate
            },
            {
                key: 'menu_lands_create',
                label: 'land',
                url: paths.landCreate
            },
            {
                key: 'menu_renters_create',
                label: 'renter',
                url: paths.renterCreate
            },
        ]
    },
    {
        key: '15',
        url: "/setting",
        label: 'menu_setting',
        // icon: 'pi pi-fw pi-cog'
    },
];
