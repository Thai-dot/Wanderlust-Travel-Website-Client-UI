import districtVN from '../VietnamDivision/VietnamDistrict';
import wardVN from '../VietnamDivision/VietnamWard';

export function getDistrictFromProvince(provinceID: number) {
    return districtVN.filter((item) => item.province_code === provinceID);
}

export function getWardFromDistrict(districtID: number) {
    return wardVN.filter((item) => item.district_code === districtID);
}
