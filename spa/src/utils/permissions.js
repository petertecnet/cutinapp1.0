const permissions = {
    'item_scam':{
        'permission': 'item_scam',
        'category': 'Item',
        'name': 'Scanear item ',
        'description': 'Permite ao usuário scanear os items .',
    },
    'Item_check':{
        'permission': 'Item_check',
        'category': 'Item',
        'name': 'Validar item ',
        'description': 'Permite ao usuário validar os items.',
    },
    'item_list':{
        'permission': 'item_list',
        'category': 'Item',
        'name': 'Listar items ',
        'description': 'Permite ao usuário listar items.',
    },
    'item_config':{
        'permission': 'item_config',
        'category': 'Item',
        'name': 'Configurar item ',
        'description': 'Permite ao usuário configurar item.',
    },
    'item_create':{
        'permission': 'item_create',
        'category': 'Item',
        'name': 'Criar item',
        'description': 'Permite ao usuário criar item.',
    },
    'user_list':{
        'permission': 'user_list',
        'category': 'Usuário',
        'name': 'Listar usuários ',
        'description': 'Permite ao usuário listar usuários.',
    },
    'user_create':{
        'permission': 'user_create',
        'category': 'Usuário',
        'name': 'Criar usuário ',
        'description': 'Permite ao usuário cadastrar outros usuários.',
    },
    'user_show':{
        'permission': 'user_show',
        'category': 'Usuário',
        'name': 'Ver usuário específico',
        'description': 'Permite ao usuário ver detalhes de um usuário específico.',
    },
    'user_edit':{
        'permission': 'user_edit',
        'category': 'Usuário',
        'name': 'Editar usuário',
        'description': 'Permite ao usuário editar informações de um usuário existente.',
    },
    'user_delete':{
        'permission': 'user_delete',
        'category': 'Usuário',
        'name': 'Excluir usuário',
        'description': 'Permite ao usuário excluir um usuário.',
    },
    'user_config':{
        'permission': 'user_config',
        'category': 'Usuário',
        'name': 'Configurar usuário',
        'description': 'Permite ao usuário configurar opções de um usuário.',
    },
    'event_config':{
        'permission': 'event_config',
        'category': 'Evento',
        'name': 'Configurar evento',
        'description': 'Permite ao usuário configurar evento.',
    },
    'event_create':{
        'permission': 'event_create',
        'category': 'Evento',
        'name': 'Cadastrar evento',
        'description': 'Permite ao usuário cadastrar um novo evento.',
    },
    'event_edit':{
        'permission': 'event_edit',
        'category': 'Evento',
        'name': 'Editar evento',
        'description': 'Permite ao usuário editar informações de um evento existente.',
    },
    'event_delete':{
        'permission': 'event_delete',
        'category': 'Evento',
        'name': 'Excluir evento',
        'description': 'Permite ao usuário excluir um evento.',
    },
    'ticket_create':{
        'permission': 'ticket_create',
        'category': 'Ingresso',
        'name': 'Cadastrar ingresso ',
        'description': 'Permite ao usuário cadastrar ingressos para um evento específico.',
    },
    'ticket_edit':{
        'permission': 'ticket_edit',
        'category': 'Ingresso',
        'name': 'Editar ingresso ',
        'description': 'Permite ao usuário editar informações de um ingresso de evento existente.',
    },
    'ticket_delete':{
        'permission': 'ticket_delete',
        'category': 'Ingresso',
        'name': 'Excluir ingresso ',
        'description': 'Permite ao usuário excluir um ingresso de um evento.',
    },
    'promoter_create':{
        'permission': 'promoter_create',
        'category': 'Promoter',
        'name': 'Cadastrar promoters no evento',
        'description': 'Permite ao usuário cadastrar promoters',
    },
    'promoter_edit':{
        'permission': 'promoter_edit',
        'category': 'Promoter',
        'name': 'Editar promoters do evento',
        'description': 'Permite ao usuário editar informações de promoters.',
    },
    'promoter_delete':{
        'permission': 'promoter_delete',
        'category': 'Promoter',
        'name': 'Excluir promoters do evento',
        'description': 'Permite ao usuário excluir promoters associados a um evento.',
    },
    'profile_create':{
        'permission': 'profile_create',
        'category': 'Perfil',
        'name': 'Criar perfil',
        'description': 'Permite ao usuário criar um novo perfil no sistema.',
    },
    'profile_view':{
        'permission': 'profile_view',
        'category': 'Perfil',
        'name': 'Ver perfis',
        'description': 'Permite ao usuário ver perfis no sistema.',
    },
    'profile_show':{
        'permission': 'profile_show',
        'category': 'Perfil',
        'name': 'Ver perfil específico',
        'description': 'Permite ao usuário ver um perfil específico no sistema.',
    },
    'profile_delete':{
        'permission': 'profile_delete',
        'category': 'Perfil',
        'name': 'Excluir perfil',
        'description': 'Permite ao usuário excluir um perfil específico no sistema.',
    },
    'profile_edit':{
        'permission': 'profile_edit',
        'category': 'Perfil',
        'name': 'Editar perfil',
        'description': 'Permite ao usuário editar informações de um perfil existente.',
    },
<<<<<<< HEAD
=======
    'profile_list':{
        'permission': 'profile_list',
        'category': 'Perfil',
        'name': 'Listar perfil',
        'description': 'Permite ao usuário listar os perfils existente.',
    },
>>>>>>> main
    'permission_management':{
        'permission': 'permission_management',
        'category': 'Sistema',
        'name': 'Gerenciamento de permissões',
        'description': 'Permite ao usuário gerenciar as permissões dos perfis.',
    },
    'role_management':{
        'permission': 'role_management',
        'category': 'Sistema',
        'name': 'Gerenciamento de papéis',
        'description': 'Permite ao usuário gerenciar os papéis e suas permissões.',
    },
    'user_management':{
        'permission': 'user_management',
        'category': 'Usuário',
        'name': 'Gerenciamento de usuários',
        'description': 'Permite ao usuário gerenciar os usuários e seus perfis.',
    },
    'report_view':{
        'permission': 'report_view',
        'category': 'Relátório',
        'name': 'Visualizar relatórios',
        'description': 'Permite ao usuário visualizar relatórios e estatísticas.',
    }
};

export default permissions;
