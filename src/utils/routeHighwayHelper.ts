import { Province } from "../data/provincesData";

export interface RouteHighwayInfo {
  roadName: string;
  roadType: "Cao tốc" | "Quốc lộ" | "Đường bộ liên vùng" | "Hàng không" | "Đường sắt / Thủy";
  description: string;
  landmarks: string;
  tags: string[];
}

export function getRouteHighwayInfo(
  origin: Province,
  destination: Province,
  transportMode: "road" | "air" | "water"
): RouteHighwayInfo {
  if (transportMode === "air") {
    const isMajorHub =
      (origin.name.includes("Hà Nội") || origin.name.includes("Hồ Chí Minh") || origin.name.includes("Đà Nẵng")) &&
      (destination.name.includes("Hà Nội") || destination.name.includes("Hồ Chí Minh") || destination.name.includes("Đà Nẵng"));
    return {
      roadName: isMajorHub
        ? "Đường bay Trục Vàng Quốc gia (HAN - SGN - DAD)"
        : `Đường bay Liên vùng kết nối ${origin.name} ➔ ${destination.name}`,
      roadType: "Hàng không",
      description: "Hành lang không lưu đường bay dân dụng tầm cao theo tiêu chuẩn ICAO",
      landmarks: "Sân bay Quốc tế / Nội địa tiếp cận trực tiếp",
      tags: ["Hàng không", "Đường bay trục", "Tốc độ cao"],
    };
  }

  if (transportMode === "water") {
    const hasSea = origin.regionCode !== "V1" && destination.regionCode !== "V1";
    if (hasSea) {
      return {
        roadName: "Tuyến Hải trình Ven biển & Đường sắt Thống Nhất Bắc - Nam",
        roadType: "Đường sắt / Thủy",
        description: "Hành lang vận tải hàng hải duyên hải kết hợp đường sắt khổ 1.000mm xuyên Việt",
        landmarks: "Cảng biển nước sâu, Cảng du thuyền quốc tế và ga tàu hỏa Thống Nhất",
        tags: ["Đường sắt Thống Nhất", "Hải trình ven biển", "Vận tải xanh"],
      };
    }
    return {
      roadName: "Tuyến Đường sắt Bắc - Nam / Thủy nội địa Sông Hồng & Mekong",
      roadType: "Đường sắt / Thủy",
      description: "Hệ thống đường thủy nội địa kết hợp mạng lưới ga đường sắt quốc gia",
      landmarks: "Bến thủy nội địa, âu thuyền và luồng đường thủy",
      tags: ["Đường sắt quốc gia", "Thủy nội địa"],
    };
  }

  // ROAD TRANSPORT - Analyze origins, destinations and specific highways
  const oReg = origin.regionCode;
  const dReg = destination.regionCode;

  // 1. Same Region or Adjacent V1 (Northern Mountains)
  if (oReg === "V1" && dReg === "V1") {
    if (origin.name.includes("Lào Cai") || destination.name.includes("Lào Cai")) {
      return {
        roadName: "Cao tốc Nội Bài - Lào Cai (CT.05) & Quốc lộ 4D, Quốc lộ 70",
        roadType: "Cao tốc",
        description: "Trục cao tốc Tây Bắc kết nối đồng bằng lên vùng núi Hoàng Liên Sơn và cửa khẩu quốc tế Hà Khẩu",
        landmarks: "Cầu Kim Thành, Đèo Hoàng Liên, Cửa khẩu Quốc tế Lào Cai",
        tags: ["Cao tốc CT.05", "Quốc lộ 4D", "Quốc lộ 70"],
      };
    }
    if (origin.name.includes("Tuyên Quang") || destination.name.includes("Tuyên Quang")) {
      return {
        roadName: "Cao tốc Tuyên Quang - Phú Thọ & Quốc lộ 2, Quốc lộ 4C (Đường Hạnh Phúc)",
        roadType: "Cao tốc",
        description: "Tuyến hành lang giao thông huyết mạch kết nối Thủ đô Kháng chiến và Công viên Địa chất Cao nguyên đá Đồng Văn",
        landmarks: "Cột cờ Lũng Cú, Đèo Mã Pí Lèng, Cầu Nông Tiến",
        tags: ["Cao tốc TQ-PT", "Quốc lộ 2", "Quốc lộ 4C"],
      };
    }
    if (origin.name.includes("Cao Bằng") || destination.name.includes("Cao Bằng")) {
      return {
        roadName: "Quốc lộ 3 & Cao tốc Đồng Đăng - Trà Lĩnh, Quốc lộ 4A",
        roadType: "Quốc lộ",
        description: "Tuyến đường huyết mạch vành đai Đông Bắc dẫn qua các di tích chiến khu và Thác Bản Giốc",
        landmarks: "Đèo Gió, Đèo Giàng, Thác Bản Giốc, Cửa khẩu Tà Lùng",
        tags: ["Quốc lộ 3", "Quốc lộ 4A", "CT Đồng Đăng - Trà Lĩnh"],
      };
    }
    return {
      roadName: "Quốc lộ 6 & Quốc lộ 37, Quốc lộ 43",
      roadType: "Quốc lộ",
      description: "Tuyến đèo dốc uốn lượn kết nối lòng chảo Tây Bắc, cao nguyên Mộc Châu và thung lũng Mường Thanh",
      landmarks: "Đèo Thung Khe, Đèo Pha Đin, Cao nguyên Mộc Châu",
      tags: ["Quốc lộ 6", "Quốc lộ 37", "Đèo Pha Đin"],
    };
  }

  // 2. V2 (Red River Delta) internal or V1 <-> V2
  if ((oReg === "V1" || oReg === "V2") && (dReg === "V1" || dReg === "V2")) {
    if (origin.name.includes("Quảng Ninh") || destination.name.includes("Quảng Ninh")) {
      return {
        roadName: "Cao tốc Hà Nội - Hải Phòng (CT.04) & Cao tốc Hải Phòng - Hạ Long - Vân Đồn - Móng Cái (CT.06)",
        roadType: "Cao tốc",
        description: "Tuyến cao tốc hiện đại bậc nhất Việt Nam kết nối Vùng Thủ đô với vịnh Di sản Hạ Long và biên giới Móng Cái",
        landmarks: "Cầu Bạch Đằng, Cầu Bãi Cháy, Sân bay Vân Đồn",
        tags: ["Cao tốc CT.04", "Cao tốc CT.06", "Quốc lộ 18"],
      };
    }
    if (origin.name.includes("Ninh Bình") || destination.name.includes("Ninh Bình")) {
      return {
        roadName: "Cao tốc Bắc - Nam (CT.01: Đoạn Pháp Vân - Cầu Giẽ - Ninh Bình - Mai Sơn) & Quốc lộ 1A",
        roadType: "Cao tốc",
        description: "Tuyến cao tốc xương sống cửa ngõ phía Nam Thủ đô kết nối di sản Tràng An - Cố đô Hoa Lư",
        landmarks: "Nút giao Liêm Tuyền, Tam Điệp, Tràng An",
        tags: ["Cao tốc CT.01", "Quốc lộ 1A", "Quốc lộ 10"],
      };
    }
    return {
      roadName: "Cao tốc Hà Nội - Bắc Giang - Lạng Sơn (CT.02) & Vành đai 4 Vùng Thủ đô",
      roadType: "Cao tốc",
      description: "Hành lang kinh tế kết nối mạng lưới đô thị đồng bằng sông Hồng và các khu công nghệ cao",
      landmarks: "Cầu Nhật Tân, Cầu Phù Đổng, Nút giao Pháp Vân",
      tags: ["Cao tốc CT.02", "Quốc lộ 1A", "Vành đai 4"],
    };
  }

  // 3. Central Coast (V3)
  if (oReg === "V3" || dReg === "V3") {
    if ((oReg === "V2" || oReg === "V1") && dReg === "V3") {
      return {
        roadName: "Cao tốc Bắc - Nam phía Đông (CT.01: Mai Sơn - QL45 - Diễn Châu - Bãi Vọt) & Quốc lộ 1A",
        roadType: "Cao tốc",
        description: "Tuyến cao tốc nối liền Hà Nội - Thanh Hóa - Nghệ An - Hà Tĩnh, rút ngắn hành trình tham quan di sản",
        landmarks: "Hầm Thung Thi, Cầu vượt sông Lam, Đèo Ngang",
        tags: ["Cao tốc CT.01", "Quốc lộ 1A", "Đường ven biển"],
      };
    }
    if (origin.name.includes("Đà Nẵng") || destination.name.includes("Đà Nẵng") || origin.name.includes("Thừa Thiên Huế") || destination.name.includes("Thừa Thiên Huế")) {
      return {
        roadName: "Cao tốc Cam Lộ - La Sơn - Túy Loan & Hầm đường bộ Hải Vân - Quốc lộ 1A",
        roadType: "Cao tốc",
        description: "Cung đường di sản miền Trung kết nối Quần thể Cố đô Huế, Phố cổ Hội An và Thánh địa Mỹ Sơn",
        landmarks: "Hầm Hải Vân, Đèo Hải Vân ('Thiên hạ đệ nhất hùng quan'), Cầu Rồng",
        tags: ["Cao tốc La Sơn - Túy Loan", "Quốc lộ 1A", "Hầm Hải Vân"],
      };
    }
    return {
      roadName: "Cao tốc Bắc - Nam (CT.01) & Quốc lộ 1A, Đường ven biển Quốc gia",
      roadType: "Cao tốc",
      description: "Tuyến đường huyết mạch bám dọc duyên hải miền Trung với các bãi biển và danh lam thắng cảnh",
      landmarks: "Đèo Cù Mông, Đèo Cả, Vịnh Vũng Rô, Vịnh Nha Trang",
      tags: ["Quốc lộ 1A", "Cao tốc CT.01", "Đường ven biển"],
    };
  }

  // 4. Central Highlands (V4)
  if (oReg === "V4" || dReg === "V4") {
    if (origin.name.includes("Lâm Đồng") || destination.name.includes("Lâm Đồng")) {
      return {
        roadName: "Cao tốc Dầu Giây - Tân Phú - Bảo Lộc - Liên Khương & Quốc lộ 20",
        roadType: "Cao tốc",
        description: "Cung đường hoa kết nối Đông Nam Bộ vượt đèo Prenn, đèo Bảo Lộc lên xứ sở ngàn hoa Đà Lạt",
        landmarks: "Đèo Bảo Lộc, Đèo Prenn, Hồ Tuyền Lâm",
        tags: ["Quốc lộ 20", "Cao tốc Dầu Giây - Liên Khương", "Đèo Prenn"],
      };
    }
    if (origin.name.includes("Đắk Lắk") || destination.name.includes("Đắk Lắk")) {
      return {
        roadName: "Quốc lộ 14 (Đường Hồ Chí Minh) & Cao tốc Khánh Hòa - Buôn Ma Thuột (CT.24), Quốc lộ 26",
        roadType: "Quốc lộ",
        description: "Trục xương sống xuyên cao nguyên đất đỏ bazan và tuyến ngang kết nối biển Nha Trang với thủ phủ cà phê",
        landmarks: "Đèo Phượng Hoàng, Cầu Sêrêpôk, Hồ Lắk",
        tags: ["Quốc lộ 14", "Quốc lộ 26", "Cao tốc CT.24"],
      };
    }
    return {
      roadName: "Đường Hồ Chí Minh (Quốc lộ 14) & Quốc lộ 19 (Quy Nhơn - Pleiku)",
      roadType: "Quốc lộ",
      description: "Hành lang kinh tế Đông - Tây kết nối cảng biển miền Trung lên các nếp nhà rông và đại ngàn Tây Nguyên",
      landmarks: "Đèo An Khê, Đèo Mang Yang, Biển Hồ T'nưng",
      tags: ["Quốc lộ 14", "Quốc lộ 19", "Đường Hồ Chí Minh"],
    };
  }

  // 5. Southeast (V5)
  if (oReg === "V5" || dReg === "V5") {
    if (origin.name.includes("Bà Rịa") || destination.name.includes("Bà Rịa")) {
      return {
        roadName: "Cao tốc Biên Hòa - Vũng Tàu (CT.28) & Quốc lộ 51",
        roadType: "Cao tốc",
        description: "Tuyến đường du lịch biển sôi động kết nối trung tâm kinh tế TP.HCM ra cụm nghỉ dưỡng Vũng Tàu",
        landmarks: "Ngã ba Vũng Tàu, Cảng Cái Mép - Thị Vải, Bãi Sau",
        tags: ["Cao tốc CT.28", "Quốc lộ 51", "Đường ven biển"],
      };
    }
    return {
      roadName: "Cao tốc TP.HCM - Long Thành - Dầu Giây (CT.29) & Vành đai 3 TP.HCM, Quốc lộ 1A",
      roadType: "Cao tốc",
      description: "Cửa ngõ Đông Nam Bộ kết nối sân bay quốc tế Long Thành và các trọng điểm du lịch công nghiệp",
      landmarks: "Cầu Long Thành, Nút giao An Phú, Sân bay Long Thành",
      tags: ["Cao tốc CT.29", "Vành đai 3", "Quốc lộ 1A"],
    };
  }

  // 6. Mekong Delta (V6)
  if (oReg === "V6" || dReg === "V6") {
    if (origin.name.includes("Kiên Giang") || destination.name.includes("Kiên Giang")) {
      return {
        roadName: "Cao tốc Lộ Tẻ - Rạch Sỏi & Quốc lộ 80, Tuyến phà/tàu cao tốc Phú Quốc",
        roadType: "Cao tốc",
        description: "Hành lang kết nối Tây Nam Bộ ra vùng biển đảo Tây Nam và thành phố ngọc Phú Quốc",
        landmarks: "Cầu Vàm Cống, Cảng Rạch Giá, Cảng Bãi Vòng Phú Quốc",
        tags: ["Cao tốc Lộ Tẻ - Rạch Sỏi", "Quốc lộ 80", "Hải trình Phú Quốc"],
      };
    }
    if (origin.name.includes("Cần Thơ") || destination.name.includes("Cần Thơ") || origin.name.includes("Tiền Giang") || destination.name.includes("Tiền Giang")) {
      return {
        roadName: "Cao tốc TP.HCM - Trung Lương - Mỹ Thuận - Cần Thơ (CT.01) & Quốc lộ 1A",
        roadType: "Cao tốc",
        description: "Trục cao tốc huyết mạch sông Tiền sông Hậu đưa du khách về miền Tây sông nước và chợ nổi",
        landmarks: "Cầu Mỹ Thuận 2, Cầu Cần Thơ, Chợ nổi Cái Răng",
        tags: ["Cao tốc CT.01", "Cầu Mỹ Thuận 2", "Quốc lộ 1A"],
      };
    }
    return {
      roadName: "Quốc lộ 60 (Cầu Rạch Miễu - Cầu Cổ Chiên) & Quốc lộ 1A, Quốc lộ 91",
      roadType: "Quốc lộ",
      description: "Cung đường miệt vườn dừa Bến Tre, cù lao sông nước và biên giới Tây Nam",
      landmarks: "Cầu Rạch Miễu, Cầu Cổ Chiên, Rừng tràm Trà Sư",
      tags: ["Quốc lộ 60", "Quốc lộ 1A", "Cầu Rạch Miễu"],
    };
  }

  // Default inter-regional
  return {
    roadName: "Cao tốc Bắc - Nam phía Đông (CT.01) & Quốc lộ 1A (Trục Xuyên Việt)",
    roadType: "Cao tốc",
    description: "Trục giao thông xương sống nối liền hai đầu đất nước từ ải Nam Quan đến mũi Cà Mau",
    landmarks: "Hệ thống cầu cạn, hầm xuyên núi và trạm thu phí không dừng liên thông",
    tags: ["Cao tốc CT.01", "Quốc lộ 1A", "Đường Hồ Chí Minh"],
  };
}
