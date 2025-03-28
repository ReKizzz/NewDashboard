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
                label: 'menu_owners_create',
                url: paths.ownerAccCreate
            },
            {
                key: 'menu_corners_create',
                label: 'menu_corners_create',
                url: paths.cornerCreate
            },
            {
                key: 'menu_cities_create',
                label: 'menu_cities_create',
                url: paths.cityCreate
            },
            {
                key: 'menu_townships_create',
                label: 'menu_townships_create',
                url: paths.townshipCreate
            },
            {
                key: 'menu_wards_create',
                label: 'menu_wards_create',
                url: paths.wardCreate
            },
            {
                key: 'menu_streets_create',
                label: 'menu_streets_create',
                url: paths.streetCreate
            },
            {
                key: 'menu_wifis_create',
                label: 'menu_wifis_create',
                url: paths.wifiCreate
            },
            {
                key: 'menu_lands_create',
                label: 'menu_lands_create',
                url: paths.landCreate
            },
            {
                key: 'menu_renters_create',
                label: 'menu_renters_create',
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
