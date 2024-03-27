export interface PreferenceMP {
  additional_info: string;
  auto_return: string;
  back_urls: {
    failure: string;
    pending: string;
    success: string;
  };
  binary_mode: boolean;
  client_id: string;
  collector_id: number;
  coupon_code: string | null;
  coupon_labels: string[] | null;
  date_created: string;
  date_of_expiration: string | null;
  expiration_date_from: string | null;
  expiration_date_to: string | null;
  expires: boolean;
  external_reference: string;
  id: string;
  init_point: string;
  internal_metadata: any | null;
  items: {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    picture_url: string;
    title: string;
    quantity: number;
    unit_price: number;
  }[];
  marketplace: string;
  marketplace_fee: number;
  metadata: Record<string, any>;
  notification_url: string | null;
  operation_type: string;
  payer: {
    phone: {
      area_code: string;
      number: string;
    };
    address: {
      zip_code: string;
      street_name: string;
      street_number: number | null;
    };
    email: string;
    identification: {
      number: string;
      type: string;
    };
    name: string;
    surname: string;
    date_created: string | null;
    last_purchase: string | null;
  };
  payment_methods: {
    default_card_id: string | null;
    default_payment_method_id: string | null;
    excluded_payment_methods: { id: string }[];
    excluded_payment_types: { id: string }[];
    installments: number | null;
    default_installments: number | null;
  };
  processing_modes: any | null; // Puedes ajustar el tipo según el contenido real
  product_id: string | null;
  redirect_urls: {
    failure: string;
    pending: string;
    success: string;
  };
  sandbox_init_point: string;
  site_id: string;
  shipments: {
    default_shipping_method: string | null;
    receiver_address: {
      zip_code: string;
      street_name: string;
      street_number: number | null;
      floor: string;
      apartment: string;
      city_name: string | null;
      state_name: string | null;
      country_name: string | null;
    };
  };
  total_amount: number | null;
  last_updated: string | null;
}
