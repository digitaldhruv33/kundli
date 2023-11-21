/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export const subUserConstants: any = {
    name: 'sub_users',
    id: 'sub_user_id',
    fName: 'first_name',
    lName: 'last_name',
    birthPlace: 'birth_place',
    birthDate: 'birth_date',
    birthTime: 'birth_time',
    user: 'user_id',
    avatar: 'avatar_url',
    isDeleted: 'is_deleted',
    gender: 'gender',
    lat: 'lat',
    lng: 'lng',
    isSelf: 'is_self',
  };

 export type RequestData = {
    name: string;
    id: string;
    first_name:string;
    last_name:string;
    birth_place:string;
    birth_date:Date;
    birth_time:string;
    user_id:string;
    avatar_url:string;
    gender:string;
    lat:string;
    lng:string;
    is_self:boolean
  };
const kundliConstants: any = {
    name: "kundli",
    id: "kundli_id",
    subUser1: "sub_user_id_1",
    subUser2: "sub_user_id_2",
    razorpay: "razorpay",
    isFree: "is_free",
    kundliType: "kundli_type",
    paymentStatus: "payment_status",
    user: "user",
    userMobile:"user_mobile",
    transaction: "transaction_id"
}
const kundliOrderConstants: any = {
    name: "kundli_order",
    id: "kundli_order_id",
    filePath: "file_path",
    type: "kundli_type",
    kundliId: "kundli_id",
    dob1: "birth_date_1",
    dob2: "birth_date_2",
    placeOfBirth1: "place_of_birth_1",
    placeOfBirth2: "place_of_birth_2"
}
enum paymentStatus {
    FAILED = 'failed',
    SUCCESS = 'success',
    INITIATED = 'initiated',
    PROCESSING = 'processing',
    REFUND = "refund",
    NA = 'N/A'
}
enum kundliType {
    KUNDLI = 'kundli',
    MATCHMAKING = 'matchmaking'
}
enum ChartStyle {
    NORTH = "NORTH_INDIAN",
    SOUTH = "SOUTH_INDIAN",
    EAST = "EAST_INDIAN"
}
interface KundliPdfRequest {
    name?: string,
    gender?: string,
    day?: number,
    month?: number,
    year?: number,
    hour?: number,
    min?: number,
    lat?: number,
    lon?: number,
    language?: string,
    tzone?: number,
    place?: string,
    chart_style?: string,
    footer_link?: string,
    logo_url?: string,
    company_url?: string,
    company_info?: string,
    domain_url?: string,
    company_email?: string,
    company_landline?: string,
    company_mobile?: string
}
interface MatchmakingPdfRequest {
    m_first_name?: string,
    m_last_name?: string,
    m_day?: number,
    m_month?: number,
    m_year?: number,
    m_hour?: number,
    m_min?: number,
    m_lat?: number,
    m_lon?: number,
    m_tzone?: number,
    m_place?: string,
    f_first_name?: string,
    f_last_name?: string,
    f_day?: number,
    f_month?: number,
    f_year?: number,
    f_hour?: number,
    f_min?: number,
    f_lat?: number,
    f_lon?: number,
    f_tzone?: number,
    f_place?: string,
    language?: string,
    ashtakoot?: boolean,
    dashakoot?: boolean,
    papasamyam?: boolean,
    chart_style?: string,
    footer_link?: string,
    logo_url?: string,
    company_url?: string,
    company_info?: string,
    domain_url?: string,
    company_email?: string,
    company_landline?: string,
    company_mobile?: string
}
const kundliAmountConstants: any = {
    name: "kundliAmount",
    ndp: "nonDiscountedPrice",
    dp: "discountedPrice",
    gstIncluded: "gstIncluded"
}
const matchmakingAmountConstants: any = {
    name: "matchmakingAmount",
    ndp: "nonDiscountedPrice",
    dp: "discountedPrice",
    gstIncluded: "gstIncluded"
}
enum pdfTypeMagicNumber {
    BASIC_KUNDLI_REPORT = 0,
    PREMIUM_KUNDLI_REPORT = 1,
    MATCH_MAKING_REPORT = 2,
}
enum kundliStatusMagicNumber {
    PROCESSING = 0,
    PAID = 1,
    UNPAID = 2,
    REFUND = 0
}

interface IBasePaymentVerification{
    razorpayPaymentId: string;
    razorpayOrderId: string;
    transactionId: number;
    isPaymentSuccess: boolean;
    razorpayObject: any;
    kundliId: string;
}

interface IKundliPaymentVerification extends IBasePaymentVerification{
    userId: string;
    subUserId?:string
}

interface IMatchMakingPaymentVerification extends IBasePaymentVerification{
    userId: string;
    subUser1: string;
    subUser2: string;
}

export {
    kundliConstants,
    kundliOrderConstants,
    paymentStatus,
    kundliType,
    KundliPdfRequest,
    MatchmakingPdfRequest,
    ChartStyle,
    kundliAmountConstants,
    matchmakingAmountConstants,
    pdfTypeMagicNumber,
    kundliStatusMagicNumber,
    IKundliPaymentVerification,
    IMatchMakingPaymentVerification
};