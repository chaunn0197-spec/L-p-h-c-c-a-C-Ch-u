export interface Attraction {
  name: string;
  cluster: string;
  desc: string;
}

export interface Hub {
  name: string;
  x: number;
  z: number;
}

export interface Quiz {
  q: string;
  options: string[];
  ans: number;
  explain: string;
}

export type QuizQuestion = Quiz;

export interface Province {
  id: string;
  stt: number;
  name: string;
  mergedFrom: string;
  regionCode: "V1" | "V2" | "V3" | "V4" | "V5" | "V6";
  regionName: string;
  color: string;
  x: number;
  z: number;
  polygon: [number, number][];
  hubs: Hub[];
  landmarkType:
    | "waterfall"
    | "flagpole"
    | "mountain_peak"
    | "monument"
    | "tea_hills"
    | "citadel"
    | "halong"
    | "temple_gate"
    | "pagoda"
    | "khue_van_cac"
    | "port_island"
    | "trang_an"
    | "lotus_house"
    | "cave_arch"
    | "imperial_gate"
    | "golden_bridge"
    | "nha_rong"
    | "cham_tower"
    | "coffee_ganhdadia"
    | "dalat_flower"
    | "skyscraper"
    | "floating_market"
    | "cape_ship";
  transport: string[];
  attractions: Attraction[];
  cuisine: string[];
  routeAdvice: string;
  quiz: Quiz;
  questions: Quiz[];
}

export interface Island {
  id: string;
  name: string;
  parentProvinceId: string;
  x: number;
  z: number;
  color: string;
  isSovereign: boolean;
}

export interface TourChallenge {
  title: string;
  desc: string;
  targetIds: string[];
  targetNames: string[];
}

export const PROVINCES_34: Province[] = [
  // ================= VÙNG 1: TRUNG DU & MIỀN NÚI PHÍA BẮC (10) =================
  {
    id: "VN-01",
    stt: 1,
    name: "Cao Bằng",
    mergedFrom: "Giữ nguyên (Tỉnh Cao Bằng)",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#F5C71A",
    x: 4.5,
    z: -43.5,
    polygon: [[2.5, -46.0], [6.8, -45.5], [7.8, -42.5], [5.2, -41.2], [2.0, -42.0]],
    hubs: [{ name: "Cao Bằng", x: 4.8, z: -43.2 }],
    landmarkType: "waterfall",
    transport: [
      "Đường bộ: QL3, QL4A, Cao tốc Đồng Đăng - Trà Lĩnh",
      "Cửa khẩu Quốc tế Tà Lùng, Sóc Giang"
    ],
    attractions: [
      {
        name: "Thác Bản Giốc & Động Ngườm Ngao",
        cluster: "Cụm Biên giới Trùng Khánh",
        desc: "Thác nước tự nhiên lớn nhất Đông Nam Á nằm trên biên giới Việt - Trung và hệ thống hang động đá vôi kỳ vĩ."
      },
      {
        name: "Khu di tích Quốc gia đặc biệt Pác Bó",
        cluster: "Cụm Lịch sử Hà Quảng",
        desc: "Nơi Chủ tịch Hồ Chí Minh trở về Tổ quốc năm 1941 với Suối Lê-nin, Núi Các Mác, Hang Cốc Bó."
      },
      {
        name: "Công viên Địa chất Toàn cầu UNESCO Non nước Cao Bằng",
        cluster: "Cụm Sinh thái - Địa chất",
        desc: "Di sản địa chất hơn 500 triệu năm, nổi bật với Mắt Thần Núi, Hồ Thang Hen và Làng đá cổ Khuổi Ky."
      }
    ],
    cuisine: ["Bánh cuốn canh Cao Bằng", "Vịt quay 7 vị", "Hạt dẻ Trùng Khánh", "Phở chua", "Thạch đen Cao Bằng"],
    routeAdvice: "Kết nối kinh điển theo Vòng cung Đông Bắc: Thái Nguyên (Hồ Ba Bể) ➔ Cao Bằng (Pác Bó - Bản Giốc) ➔ Lạng Sơn.",
    quiz: {
      "q": "Địa hình nào là dạng địa hình chủ yếu của vùng du lịch trung du miền núi Bắc Bộ, tạo nên những thắng cảnh karst kỳ vĩ như Thác Bản Giốc và động Ngườm Ngao?",
      "options": [
            "Đồi núi",
            "Đồng bằng",
            "Bán bình nguyên",
            "Thung lũng trũng"
      ],
      "ans": 0,
      "explain": "Địa hình đồi núi là dạng địa hình chủ yếu của vùng trung du miền núi Bắc Bộ, tạo nên các kỳ quan karst độc đáo như Thác Bản Giốc và động Ngườm Ngao."
},
    questions: [
      {
            "q": "Địa hình nào là dạng địa hình chủ yếu của vùng du lịch trung du miền núi Bắc Bộ, tạo nên những thắng cảnh karst kỳ vĩ như Thác Bản Giốc và động Ngườm Ngao?",
            "options": [
                  "Đồi núi",
                  "Đồng bằng",
                  "Bán bình nguyên",
                  "Thung lũng trũng"
            ],
            "ans": 0,
            "explain": "Địa hình đồi núi là dạng địa hình chủ yếu của vùng trung du miền núi Bắc Bộ, tạo nên các kỳ quan karst độc đáo như Thác Bản Giốc và động Ngườm Ngao."
      },
      {
            "q": "Đặc điểm nào nổi bật về vị trí địa lý của vùng du lịch Bắc Bộ trong chiến lược liên kết du lịch quốc tế?",
            "options": [
                  "Vùng hoàn toàn là đồng bằng kín gió",
                  "Vùng có 7 tỉnh biên giới giáp với Trung Quốc và 5 tỉnh phía Tây giáp với Lào",
                  "Vùng có hơn 5.000 km bờ biển",
                  "Vùng không tiếp giáp bất kỳ quốc gia nào"
            ],
            "ans": 1,
            "explain": "Vị trí địa lý với 7 tỉnh biên giới giáp Trung Quốc và 5 tỉnh giáp Lào mang lại lợi thế chiến lược phát triển du lịch biên mậu và kết nối tour xuyên biên giới."
      },
      {
            "q": "Tuyến du lịch nội vùng có đặc điểm nào theo nghiệp vụ quản lý tuyến điểm du lịch?",
            "options": [
                  "Bắt buộc phải bay bằng phi cơ chuyên dụng",
                  "Chi phí luôn cao nhất trong mọi loại tour",
                  "Đơn giản về phương tiện di chuyển, cách tổ chức và mối quan hệ",
                  "Chỉ di chuyển bằng tàu hỏa tốc hành"
            ],
            "ans": 2,
            "explain": "Tuyến du lịch nội vùng kết nối các điểm trong cùng một vùng sinh thái, có thủ tục tổ chức gọn gàng và phương tiện di chuyển linh hoạt."
      }
]
  },
  {
    id: "VN-02",
    stt: 2,
    name: "Tuyên Quang",
    mergedFrom: "Hợp nhất Tuyên Quang + Hà Giang",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#F05A22",
    x: -0.8,
    z: -41.5,
    polygon: [[-3.5, -47.5], [1.2, -47.0], [2.3, -43.0], [1.8, -36.5], [-1.5, -36.2], [-3.2, -41.5]],
    hubs: [
      { name: "Hà Giang", x: -1.6, z: -44.8 },
      { name: "Tuyên Quang", x: -0.2, z: -38.0 }
    ],
    landmarkType: "flagpole",
    transport: ["Đường bộ: Cao tốc Tuyên Quang - Phú Thọ - Hà Giang, QL2, QL4C (Đường Hạnh Phúc)"],
    attractions: [
      {
        name: "Cao nguyên đá Đồng Văn & Cột cờ Lũng Cú",
        cluster: "Cụm Cực Bắc (Hà Giang)",
        desc: "Công viên Địa chất Toàn cầu UNESCO với Cột cờ Lũng Cú, Dinh thự Vua Mèo và Phố cổ Đồng Văn."
      },
      {
        name: "Đèo Mã Pí Lèng & Hẻm vực Tu Sản - Sông Nho Quế",
        cluster: "Cụm Đèo cao & Sông",
        desc: "Một trong 'Tứ đại đỉnh đèo' nhìn xuống dòng sông Nho Quế xanh ngọc bích và hẻm vực sâu nhất Đông Nam Á."
      },
      {
        name: "Khu di tích Quốc gia đặc biệt Tân Trào & Hồ Na Hang",
        cluster: "Cụm Thủ đô Kháng chiến & Sinh thái (Tuyên Quang)",
        desc: "Cây đa Tân Trào, Lán Nà Nưa, Đình Tân Trào và khu bảo tồn thiên nhiên Na Hang - Lâm Bình."
      }
    ],
    cuisine: ["Thắng cố Đồng Văn", "Cháo ấu tẩu", "Cá lăng sông Gâm", "Cam sành Hàm Yên", "Bánh cuốn trứng Hà Giang"],
    routeAdvice: "Tuyến liên kết 'Từ Thủ đô Kháng chiến Tân Trào lên Cực Bắc Lũng Cú' tạo ra sản phẩm kết hợp giáo dục lịch sử và khám phá địa chất độc nhất.",
    quiz: {
      "q": "Căn cứ địa Việt Bắc với Khu di tích Quốc gia đặc biệt Tân Trào giữ vai trò lịch sử trọng đại nào?",
      "options": [
            "Là trung tâm cảng biển quốc tế thời phong kiến",
            "Là Thủ đô Kháng chiến, trung tâm lãnh đạo cuộc Tổng khởi nghĩa Cách mạng Tháng Tám năm 1945",
            "Là trung tâm đồn điền cao su lớn nhất",
            "Là khu chế xuất công nghiệp đầu tiên"
      ],
      "ans": 1,
      "explain": "Tân Trào được mệnh danh là 'Thủ đô Kháng chiến', nơi Trung ương Đảng và Bác Hồ đưa ra những quyết sách lịch sử giành độc lập dân tộc."
},
    questions: [
      {
            "q": "Căn cứ địa Việt Bắc với Khu di tích Quốc gia đặc biệt Tân Trào giữ vai trò lịch sử trọng đại nào?",
            "options": [
                  "Là trung tâm cảng biển quốc tế thời phong kiến",
                  "Là Thủ đô Kháng chiến, trung tâm lãnh đạo cuộc Tổng khởi nghĩa Cách mạng Tháng Tám năm 1945",
                  "Là trung tâm đồn điền cao su lớn nhất",
                  "Là khu chế xuất công nghiệp đầu tiên"
            ],
            "ans": 1,
            "explain": "Tân Trào được mệnh danh là 'Thủ đô Kháng chiến', nơi Trung ương Đảng và Bác Hồ đưa ra những quyết sách lịch sử giành độc lập dân tộc."
      },
      {
            "q": "Công viên Địa chất Toàn cầu UNESCO Cao nguyên đá Đồng Văn mang giá trị nổi bật nhất về:",
            "options": [
                  "Cồn cát sa mạc đỏ",
                  "Rừng ngập mặn nhiệt đới ven biển",
                  "Di sản địa chất karst tiến hóa qua hàng trăm triệu năm và sự thích ứng sinh tồn của con người trên đá",
                  "Vùng trũng phù sa ngập lũ"
            ],
            "ans": 2,
            "explain": "Cao nguyên đá Đồng Văn là công viên địa chất toàn cầu đầu tiên của Việt Nam với cảnh quan thung lũng đá và hẻm vực Tu Sản sâu nhất Đông Nam Á."
      },
      {
            "q": "Trên tuyến du lịch, cơ sở ăn uống phục vụ nhu cầu cốt lõi nào của du khách?",
            "options": [
                  "Nhu cầu an ninh chính trị",
                  "Nhu cầu giao lưu hàng hải",
                  "Nhu cầu mua sắm thiết bị điện tử",
                  "Nhu cầu về ẩm thực và thưởng thức đặc sản văn hóa địa phương"
            ],
            "ans": 3,
            "explain": "Cơ sở ăn uống trên tuyến đáp ứng nhu cầu tái tạo năng lượng và là cơ hội để du khách trải nghiệm tinh hoa ẩm thực bản địa."
      }
]
  },
  {
    id: "VN-03",
    stt: 3,
    name: "Lào Cai",
    mergedFrom: "Hợp nhất Lào Cai + Yên Bái",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#2CE5C3",
    x: -5.8,
    z: -39.5,
    polygon: [[-9.2, -43.5], [-3.8, -43.0], [-2.0, -36.8], [-5.5, -35.2], [-9.0, -38.0]],
    hubs: [
      { name: "Lào Cai", x: -6.8, z: -41.5 },
      { name: "Yên Bái", x: -4.5, z: -37.2 }
    ],
    landmarkType: "mountain_peak",
    transport: ["Cao tốc Nội Bài - Lào Cai", "Đường sắt Hà Nội - Lào Cai", "Cửa khẩu Quốc tế Lào Cai"],
    attractions: [
      {
        name: "Khu du lịch Quốc gia Sa Pa & Đỉnh Fansipan",
        cluster: "Cụm Hoàng Liên Sơn (Lào Cai)",
        desc: "Nóc nhà Đông Dương (3.143m) với hệ thống cáp treo hiện đại, Bản Cát Cát, Thung lũng Mường Hoa và Đèo Ô Quy Hồ."
      },
      {
        name: "Ruộng bậc thang Mù Cang Chải & Đèo Khau Phạ",
        cluster: "Cụm Di sản Danh thắng Quốc gia đặc biệt (Yên Bái)",
        desc: "Kiệt tác canh tác của người Mông trên sườn núi cao, mùa nước đổ và mùa lúa chín vàng rực rỡ."
      },
      {
        name: "Hồ Thác Bà, Suối Giàng & Cao nguyên Bắc Hà",
        cluster: "Cụm Sinh thái & Văn hóa",
        desc: "Chợ phiên Bắc Hà, Dinh Hoàng A Tưởng, trà Shan tuyết cổ thụ Suối Giàng và cánh đồng Mường Lò (Nghĩa Lộ)."
      }
    ],
    cuisine: ["Cá hồi & Cá tầm Sa Pa", "Thắng cố Bắc Hà", "Xôi ngũ sắc & Cốm Tú Lệ", "Trà Shan tuyết Suối Giàng"],
    routeAdvice: "Trục vàng Tây Bắc dọc Cao tốc Nội Bài - Lào Cai kết hợp QL32: Nghĩa Lộ ➔ Tú Lệ ➔ Mù Cang Chải ➔ Đèo Ô Quy Hồ ➔ Sa Pa.",
    quiz: {
      "q": "Điều kiện tự nhiên nào ở vùng Hoàng Liên Sơn tạo ra sản phẩm du lịch độc đáo khác biệt với các vùng khác ở nước ta?",
      "options": [
            "Địa hình đồng bằng châu thổ",
            "Khí hậu nhiệt đới gió phơn khô nóng quanh năm",
            "Khí hậu á nhiệt đới và ôn đới núi cao, có mùa đông lạnh với băng tuyết và mùa hoa ôn đới",
            "Đường bờ biển nhiệt đới dài"
      ],
      "ans": 2,
      "explain": "Khí hậu á nhiệt đới và ôn đới núi cao của dãy Hoàng Liên Sơn tạo điều kiện phát triển du lịch nghỉ dưỡng vùng cao và săn băng tuyết mùa đông."
},
    questions: [
      {
            "q": "Điều kiện tự nhiên nào ở vùng Hoàng Liên Sơn tạo ra sản phẩm du lịch độc đáo khác biệt với các vùng khác ở nước ta?",
            "options": [
                  "Địa hình đồng bằng châu thổ",
                  "Khí hậu nhiệt đới gió phơn khô nóng quanh năm",
                  "Khí hậu á nhiệt đới và ôn đới núi cao, có mùa đông lạnh với băng tuyết và mùa hoa ôn đới",
                  "Đường bờ biển nhiệt đới dài"
            ],
            "ans": 2,
            "explain": "Khí hậu á nhiệt đới và ôn đới núi cao của dãy Hoàng Liên Sơn tạo điều kiện phát triển du lịch nghỉ dưỡng vùng cao và săn băng tuyết mùa đông."
      },
      {
            "q": "Di sản ruộng bậc thang Mù Cang Chải và Sa Pa phản ánh giá trị tài nguyên nào?",
            "options": [
                  "Tài nguyên khoáng sản kim loại màu",
                  "Khu công nghiệp cơ giới hóa",
                  "Công trình bê tông nhân tạo",
                  "Sự sáng tạo văn hóa độc đáo của đồng bào các dân tộc trong việc chinh phục địa hình núi dốc"
            ],
            "ans": 3,
            "explain": "Ruộng bậc thang là kiệt tác nghệ thuật canh tác nông nghiệp của đồng bào Mông, Dao, được công nhận là Di tích Quốc gia đặc biệt."
      },
      {
            "q": "Khi xây dựng tuyến du lịch mạo hiểm leo đỉnh Fansipan, nguyên tắc tổ chức nào phải đặt lên hàng đầu?",
            "options": [
                  "Đảm bảo tuyệt đối an toàn cho du khách, có hướng dẫn viên chuyên nghiệp và phương án cứu hộ sẵn sàng",
                  "Bỏ qua trang thiết bị bảo hộ để hành trang nhẹ nhất",
                  "Cho phép du khách tự do tách đoàn đi ban đêm",
                  "Chạy thật nhanh để rút ngắn tối đa thời gian"
            ],
            "ans": 0,
            "explain": "Nguyên tắc hàng đầu trong thiết kế và điều hành tour du lịch mạo hiểm là tính an toàn, kỷ luật hành trình và trang thiết bị hỗ trợ chuyên dụng."
      }
]
  },
  {
    id: "VN-04",
    stt: 4,
    name: "Lai Châu",
    mergedFrom: "Giữ nguyên (Tỉnh Lai Châu)",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#F59E0B",
    x: -11.5,
    z: -41.5,
    polygon: [[-14.5, -44.0], [-9.5, -43.5], [-9.2, -38.5], [-13.5, -39.0]],
    hubs: [{ name: "Lai Châu", x: -11.2, z: -41.2 }],
    landmarkType: "mountain_peak",
    transport: ["Đường bộ: QL4D, QL12, Tuyến nối Cao tốc Nội Bài - Lào Cai"],
    attractions: [
      {
        name: "Khu du lịch Cầu kính Rồng Mây & Đỉnh Ô Quy Hồ",
        cluster: "Cụm Đèo cao Tam Đường",
        desc: "Hệ thống thang máy trong lòng núi đá và cầu kính vươn ra từ vách núi ở độ cao trên 2.200m."
      },
      {
        name: "Cao nguyên Sìn Hồ & Bản Sin Suối Hồ",
        cluster: "Cụm Du lịch Cộng đồng ASEAN",
        desc: "Bản du lịch cộng đồng người Mông tiêu biểu với hoa địa lan, thác Trái Tim và biển mây Sìn Hồ."
      },
      {
        name: "Quần thể các đỉnh núi cao: Pu Ta Leng, Pu Si Lung",
        cluster: "Cụm Trekking Mạo hiểm",
        desc: "Thiên đường leo núi khám phá rừng đỗ quyên cổ thụ trên những đỉnh núi cao trên 3.000m."
      }
    ],
    cuisine: ["Lợn cắp nách Lai Châu", "Cá bống vùi tro", "Xôi tím Sìn Hồ", "Rêu đá nướng", "Mắc khén - Hạt dổi"],
    routeAdvice: "Kết nối trực tiếp với Sa Pa (Lào Cai) qua đèo Ô Quy Hồ và xuống Điện Biên Phủ qua QL12.",
    quiz: {
      "q": "Đèo Ô Quy Hồ - ranh giới giữa Lai Châu và Lào Cai - nổi danh trong giới du lịch với danh xưng nào?",
      "options": [
            "Đệ nhất danh thắng đồng bằng",
            "Tuyến đường ngầm vượt sông",
            "Đèo ven biển dài nhất",
            "Một trong 'Tứ đại đỉnh đèo' hùng vĩ và hiểm trở nhất của miền Bắc"
      ],
      "ans": 3,
      "explain": "Đèo Ô Quy Hồ với độ dài gần 50 km vượt qua dãy Hoàng Liên Sơn hùng vĩ là vua của các con đèo ở miền Bắc Việt Nam."
},
    questions: [
      {
            "q": "Đèo Ô Quy Hồ - ranh giới giữa Lai Châu và Lào Cai - nổi danh trong giới du lịch với danh xưng nào?",
            "options": [
                  "Đệ nhất danh thắng đồng bằng",
                  "Tuyến đường ngầm vượt sông",
                  "Đèo ven biển dài nhất",
                  "Một trong 'Tứ đại đỉnh đèo' hùng vĩ và hiểm trở nhất của miền Bắc"
            ],
            "ans": 3,
            "explain": "Đèo Ô Quy Hồ với độ dài gần 50 km vượt qua dãy Hoàng Liên Sơn hùng vĩ là vua của các con đèo ở miền Bắc Việt Nam."
      },
      {
            "q": "Điểm du lịch văn hóa cộng đồng như bản Sin Suối Hồ, Sì Thâu Chải tập trung khai thác giá trị gì?",
            "options": [
                  "Sự độc đáo của phong tục tập quán, kiến trúc nhà gỗ và không gian sinh thái nguyên sơ của đồng bào bản địa",
                  "Hệ thống sòng bài nghỉ dưỡng cao cấp",
                  "Dây chuyền sản xuất công nghiệp nặng",
                  "Các trung tâm thương mại siêu thị hiện đại"
            ],
            "ans": 0,
            "explain": "Điểm du lịch văn hóa cộng đồng thu hút khách nhờ nét văn hóa mộc mạc, sự hiếu khách và đời sống truyền thống của cư dân địa phương."
      },
      {
            "q": "Tuyến du lịch liên kết các điểm của những vùng du lịch khác nhau được gọi là:",
            "options": [
                  "Tuyến du lịch nội vùng",
                  "Tuyến du lịch liên vùng",
                  "Tuyến du lịch đô thị",
                  "Tuyến du lịch một điểm"
            ],
            "ans": 1,
            "explain": "Tuyến du lịch liên kết các điểm đến thuộc nhiều vùng du lịch khác nhau được gọi là tuyến du lịch liên vùng, thường có quy mô lớn và đa dạng dịch vụ."
      }
]
  },
  {
    id: "VN-05",
    stt: 5,
    name: "Điện Biên",
    mergedFrom: "Giữ nguyên (Tỉnh Điện Biên)",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#EA580C",
    x: -12.8,
    z: -36.0,
    polygon: [[-15.5, -39.0], [-10.2, -38.5], [-9.8, -33.2], [-14.5, -33.5]],
    hubs: [{ name: "Điện Biên Phủ", x: -12.8, z: -36.2 }],
    landmarkType: "monument",
    transport: [
      "Đường hàng không: Sân bay Điện Biên",
      "Đường bộ: QL6 (qua Đèo Pha Đin), QL12, Cửa khẩu Quốc tế Tây Trang"
    ],
    attractions: [
      {
        name: "Di tích Quốc gia đặc biệt Chiến trường Điện Biên Phủ",
        cluster: "Cụm Lịch sử Cách mạng",
        desc: "Đồi A1, Hầm Đờ Cát, Tượng đài Chiến thắng Điện Biên Phủ, Bảo tàng Chiến thắng lịch sử Điện Biên Phủ và Sở chỉ huy Mường Phăng."
      },
      {
        name: "Cực Tây A Pa Chải (Mường Nhé)",
        cluster: "Cụm Biên giới",
        desc: "Cột mốc ngã ba biên giới Việt Nam - Lào - Trung Quốc, nơi 'một con gà gáy ba nước cùng nghe'."
      },
      {
        name: "Đèo Pha Đin, Hồ Pá Khoang & Thành Bản Phủ",
        cluster: "Cụm Sinh thái & Văn hóa Thái",
        desc: "Thung lũng Mường Thanh trù phú, mùa hoa Ban trắng tháng 3 và văn hóa dân tộc Thái."
      }
    ],
    cuisine: ["Gà nướng mắc khén", "Xôi nếp nương Điện Biên", "Pa Pỉnh Tộp", "Chẩm chéo", "Thịt trâu gác bếp"],
    routeAdvice: "Có thể kết hợp đường bay thẳng từ Hà Nội/TP.HCM lên Điện Biên rồi đi đường bộ khảo sát Sơn La - Mộc Châu.",
    quiz: {
      "q": "Quần thể di tích Chiến trường Điện Biên Phủ thuộc loại tài nguyên du lịch nào có giá trị lịch sử toàn cầu?",
      "options": [
            "Tài nguyên du lịch nhân văn - Di tích lịch sử cách mạng hào hùng",
            "Tài nguyên du lịch tự nhiên biển đảo",
            "Tài nguyên giải trí công viên nước",
            "Tài nguyên du lịch làng nghề thủ công mới thành lập"
      ],
      "ans": 0,
      "explain": "Chiến trường Điện Biên Phủ với Đồi A1, Hầm De Castries, Bảo tàng Chiến thắng là di tích lịch sử cách mạng chấn động địa cầu."
},
    questions: [
      {
            "q": "Quần thể di tích Chiến trường Điện Biên Phủ thuộc loại tài nguyên du lịch nào có giá trị lịch sử toàn cầu?",
            "options": [
                  "Tài nguyên du lịch nhân văn - Di tích lịch sử cách mạng hào hùng",
                  "Tài nguyên du lịch tự nhiên biển đảo",
                  "Tài nguyên giải trí công viên nước",
                  "Tài nguyên du lịch làng nghề thủ công mới thành lập"
            ],
            "ans": 0,
            "explain": "Chiến trường Điện Biên Phủ với Đồi A1, Hầm De Castries, Bảo tàng Chiến thắng là di tích lịch sử cách mạng chấn động địa cầu."
      },
      {
            "q": "Cột mốc Cực Tây Tổ quốc A Pa Chải nằm ở ngã ba biên giới giữa Việt Nam và hai quốc gia nào?",
            "options": [
                  "Lào và Campuchia",
                  "Trung Quốc và Lào",
                  "Trung Quốc và Thái Lan",
                  "Lào và Myanmar"
            ],
            "ans": 1,
            "explain": "A Pa Chải là cột mốc ngã ba biên giới Việt Nam - Lào - Trung Quốc, nơi 'một tiếng gà gáy cả ba nước cùng nghe'."
      },
      {
            "q": "Tầm quan trọng của tuyến - điểm du lịch đối với an ninh trật tự và chủ quyền biên giới là gì?",
            "options": [
                  "Chỉ phục vụ thương mại không liên quan an ninh",
                  "Gây khó khăn cho lực lượng biên phòng tuần tra",
                  "Góp phần củng cố an ninh quốc phòng, khẳng định chủ quyền biên cương và nâng cao đời sống cư dân vùng phên dậu",
                  "Làm thay đổi đường biên giới quốc gia"
            ],
            "ans": 2,
            "explain": "Xây dựng các tuyến du lịch biên giới vừa phát triển kinh tế vừa tăng cường bảo vệ vững chắc chủ quyền lãnh thổ quốc gia."
      }
]
  },
  {
    id: "VN-06",
    stt: 6,
    name: "Sơn La",
    mergedFrom: "Giữ nguyên (Tỉnh Sơn La)",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#0047BA",
    x: -7.5,
    z: -34.2,
    polygon: [[-10.2, -37.5], [-5.0, -36.0], [-3.8, -31.8], [-9.5, -32.5]],
    hubs: [{ name: "Sơn La", x: -7.8, z: -34.5 }],
    landmarkType: "tea_hills",
    transport: ["Đường bộ: Quốc lộ 6, Cao tốc Hòa Bình - Mộc Châu - Sơn La"],
    attractions: [
      {
        name: "Khu du lịch Quốc gia Mộc Châu",
        cluster: "Cụm Cao nguyên Mộc Châu",
        desc: "Đồi chè Trái Tim, Rừng thông Bản Áng, Thác Dải Yếm, Cầu kính Bạch Long (dài nhất thế giới) và thung lũng mận Nà Ka."
      },
      {
        name: "Thiên đường săn mây Tà Xùa & Ngọc Chiến",
        cluster: "Cụm Bắc Yên - Mường La",
        desc: "Sống lưng khủng long Tà Xùa, thảo nguyên Tà Xùa và bản khoáng nóng Ngọc Chiến."
      },
      {
        name: "Di tích Quốc gia đặc biệt Nhà tù Sơn La & Lòng hồ Quỳnh Nhai",
        cluster: "Cụm TP. Sơn La & Sông Đà",
        desc: "Cây đào Tô Hiệu lịch sử, Thủy điện Sơn La và vùng lòng hồ sông Đà hùng vĩ."
      }
    ],
    cuisine: ["Bê chao Mộc Châu", "Sữa tươi & Bánh sữa Mộc Châu", "Cá nướng sông Đà", "Mận hậu & Dâu tây Mộc Châu"],
    routeAdvice: "Cửa ngõ vàng của vòng cung Tây Bắc trên trục Quốc lộ 6, đặc biệt hút khách mùa hoa mận, hoa mơ (tháng 1-2) và mùa mận chín (tháng 5).",
    quiz: {
      "q": "Cao nguyên Mộc Châu sở hữu tài nguyên du lịch tự nhiên tiêu biểu nào làm say lòng du khách?",
      "options": [
            "Bãi tắm biển cát trắng trải dài",
            "Khí hậu mát mẻ, đồi chè xanh ngát, thung lũng hoa mận nà ka và thác dải yếm",
            "Rừng tràm ngập nước mùa lũ",
            "Cồn cát trắng ven biển"
      ],
      "ans": 1,
      "explain": "Cao nguyên Mộc Châu có khí hậu trong lành mát mẻ quanh năm, thảo nguyên mênh mông và cảnh sắc bốn mùa hoa trái rực rỡ."
},
    questions: [
      {
            "q": "Cao nguyên Mộc Châu sở hữu tài nguyên du lịch tự nhiên tiêu biểu nào làm say lòng du khách?",
            "options": [
                  "Bãi tắm biển cát trắng trải dài",
                  "Khí hậu mát mẻ, đồi chè xanh ngát, thung lũng hoa mận nà ka và thác dải yếm",
                  "Rừng tràm ngập nước mùa lũ",
                  "Cồn cát trắng ven biển"
            ],
            "ans": 1,
            "explain": "Cao nguyên Mộc Châu có khí hậu trong lành mát mẻ quanh năm, thảo nguyên mênh mông và cảnh sắc bốn mùa hoa trái rực rỡ."
      },
      {
            "q": "Di tích lịch sử Quốc gia đặc biệt Nhà tù Sơn La và Cây đào Tô Hiệu mang ý nghĩa biểu tượng:",
            "options": [
                  "Biểu tượng thương cảng cổ sầm uất",
                  "Biểu tượng kiến trúc đền tháp Chăm Pa",
                  "Biểu tượng cho tinh thần kiên trung, bất khuất của các chiến sĩ cách mạng Việt Nam",
                  "Biểu tượng khai thác lâm nghiệp"
            ],
            "ans": 2,
            "explain": "Cây đào Tô Hiệu tại Nhà tù Sơn La là biểu tượng trường tồn cho sức sống mãnh liệt và tinh thần lạc quan cách mạng."
      },
      {
            "q": "Điểm du lịch được định nghĩa như thế nào trong quy định của Luật Du lịch?",
            "options": [
                  "Nơi chỉ có dịch vụ khách sạn lưu trú",
                  "Nơi dành riêng cho hoạt động vận tải hàng hóa",
                  "Nơi tập trung các tòa nhà hành chính",
                  "Nơi có tài nguyên du lịch hấp dẫn, có khả năng thu hút du khách"
            ],
            "ans": 3,
            "explain": "Điểm du lịch là nơi có tài nguyên du lịch hấp dẫn, có khả năng thu hút du khách đến tham quan và trải nghiệm."
      }
]
  },
  {
    id: "VN-07",
    stt: 7,
    name: "Thái Nguyên",
    mergedFrom: "Hợp nhất Thái Nguyên + Bắc Kạn",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#10B981",
    x: 2.2,
    z: -38.5,
    polygon: [[0.5, -42.5], [4.2, -42.0], [4.5, -35.2], [0.8, -35.5]],
    hubs: [
      { name: "Bắc Kạn", x: 2.5, z: -40.8 },
      { name: "Thái Nguyên", x: 2.2, z: -36.5 }
    ],
    landmarkType: "tea_hills",
    transport: ["Đường bộ: Cao tốc Hà Nội - Thái Nguyên - Bắc Kạn - Cao Bằng, QL3"],
    attractions: [
      {
        name: "Vườn Quốc gia & Danh thắng Hồ Ba Bể",
        cluster: "Cụm Sinh thái Bắc Kạn",
        desc: "Một trong 20 hồ nước ngọt tự nhiên đặc biệt của thế giới (Khu Ramsar) với Động Puông, Ao Tiên, Đảo Bà Góa và Thác Đầu Đẳng."
      },
      {
        name: "Khu du lịch Hồ Núi Cốc & Không gian Văn hóa Trà Tân Cương",
        cluster: "Cụm Thái Nguyên",
        desc: "Đồi chè Tân Cương ('Đệ nhất danh trà'), Hồ Núi Cốc huyền thoại và Bảo tàng Văn hóa các dân tộc Việt Nam."
      },
      {
        name: "Khu di tích Quốc gia đặc biệt ATK Định Hóa",
        cluster: "Cụm Lịch sử Chiến khu Việt Bắc",
        desc: "Nơi ở và làm việc của Chủ tịch Hồ Chí Minh cùng Trung ương Đảng trong kháng chiến chống Pháp."
      }
    ],
    cuisine: ["Trà Tân Cương Thái Nguyên", "Bánh ngải", "Cá nướng Pác Ngòi (Ba Bể)", "Tôm cuốn Thừa Lâm", "Cơm lam Định Hóa"],
    routeAdvice: "Sự kết hợp Thái Nguyên + Bắc Kạn tạo thành tuyến hoàn chỉnh: Văn hóa Trà Tân Cương ➔ Lịch sử ATK Định Hóa ➔ Sinh thái Hồ Ba Bể.",
    quiz: {
      "q": "Vùng chè Tân Cương (Thái Nguyên) trở thành điểm du lịch làng nghề hấp dẫn nhờ điều kiện tự nhiên nào?",
      "options": [
            "Vùng trũng quanh năm úng ngập",
            "Nước mặn xâm nhập ven biển",
            "Đất feralit vùng chân núi Tam Đảo và khí hậu mát mẻ tạo nên hương vị chè đệ nhất danh trà",
            "Vùng đất cát khô hạn cằn cỗi"
      ],
      "ans": 2,
      "explain": "Thổ nhưỡng và nguồn nước suối nguồn vùng chân núi Tam Đảo tạo nên phẩm chất chè Tân Cương hương cốm non ngọt hậu trứ danh."
},
    questions: [
      {
            "q": "Vùng chè Tân Cương (Thái Nguyên) trở thành điểm du lịch làng nghề hấp dẫn nhờ điều kiện tự nhiên nào?",
            "options": [
                  "Vùng trũng quanh năm úng ngập",
                  "Nước mặn xâm nhập ven biển",
                  "Đất feralit vùng chân núi Tam Đảo và khí hậu mát mẻ tạo nên hương vị chè đệ nhất danh trà",
                  "Vùng đất cát khô hạn cằn cỗi"
            ],
            "ans": 2,
            "explain": "Thổ nhưỡng và nguồn nước suối nguồn vùng chân núi Tam Đảo tạo nên phẩm chất chè Tân Cương hương cốm non ngọt hậu trứ danh."
      },
      {
            "q": "Khu di tích lịch sử Quốc gia đặc biệt ATK Định Hóa được mệnh danh là:",
            "options": [
                  "Trung tâm du lịch biển đảo",
                  "Cố đô thời phong kiến",
                  "Thương cảng quốc tế cổ",
                  "Thủ đô gió ngàn - Trung tâm căn cứ địa kháng chiến chống thực dân Pháp"
            ],
            "ans": 3,
            "explain": "ATK Định Hóa là căn cứ địa an toàn tuyệt mật, nơi Trung ương Đảng và Bác Hồ chỉ đạo chiến dịch Điện Biên Phủ lịch sử."
      },
      {
            "q": "Nguyên tắc nào trong việc xây dựng tuyến du lịch giúp tránh gây nhàm chán cho du khách?",
            "options": [
                  "Phong phú đa dạng nội dung tuyến du lịch và tránh lặp lại các điểm đến trùng lặp",
                  "Lặp lại một điểm tham quan nhiều lần trong cùng một ngày",
                  "Chỉ đi xem một thể loại di tích duy nhất",
                  "Ép du khách ngồi trên xe suốt cả chuyến"
            ],
            "ans": 0,
            "explain": "Đa dạng hóa nội dung và tối ưu hóa lộ trình tránh lặp lại là nguyên tắc cốt lõi giúp giữ vững hứng thú cho du khách suốt hành trình."
      }
]
  },
  {
    id: "VN-08",
    stt: 8,
    name: "Lạng Sơn",
    mergedFrom: "Giữ nguyên (Tỉnh Lạng Sơn)",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#0047BA",
    x: 6.2,
    z: -38.0,
    polygon: [[4.3, -41.0], [8.5, -40.0], [8.8, -36.0], [4.6, -36.2]],
    hubs: [{ name: "Lạng Sơn", x: 6.4, z: -38.2 }],
    landmarkType: "citadel",
    transport: [
      "Cao tốc Bắc Giang - Lạng Sơn - Hữu Nghị",
      "Đường sắt Quốc tế Liên vận Hà Nội - Đồng Đăng",
      "Cửa khẩu Quốc tế Hữu Nghị"
    ],
    attractions: [
      {
        name: "Quần thể Nhị Thanh - Tam Thanh - Thành Nhà Mạc - Tô Thị",
        cluster: "Cụm TP. Lạng Sơn",
        desc: "Chùa trong hang đá Tam Thanh, tượng nàng Tô Thị bồng con và dấu ấn lịch sử Thành Nhà Mạc."
      },
      {
        name: "Khu du lịch Quốc gia Mẫu Sơn",
        cluster: "Cụm Nghỉ dưỡng Núi cao",
        desc: "Đỉnh núi cao hơn 1.500m quanh năm mây phủ, nổi tiếng với hiện tượng băng giá mùa đông và kiến trúc biệt thự cổ."
      },
      {
        name: "Công viên Địa chất Toàn cầu UNESCO Lạng Sơn & Ải Chi Lăng",
        cluster: "Cụm Địa chất & Lịch sử",
        desc: "Thung lũng Bắc Sơn, Hố sụt Kong Collapse và Ải Chi Lăng hào hùng."
      }
    ],
    cuisine: ["Vịt quay Lạng Sơn (lá mắc mật)", "Khâu nhục", "Phở chua Lạng Sơn", "Na Chi Lăng", "Đào Mẫu Sơn"],
    routeAdvice: "Điểm trung chuyển thương mại và du lịch biên giới trọng yếu kết nối Hà Nội - Bắc Ninh với Trung Quốc và Quảng Ninh (qua QL4B).",
    quiz: {
      "q": "Địa danh văn hóa và thắng cảnh nổi tiếng nào ở Lạng Sơn đã đi vào văn học dân gian?",
      "options": [
            "Động Phong Nha và sông Son",
            "Ngũ Hành Sơn và sông Hàn",
            "Chùa Yên Tử và chùa Đồng",
            "Phố Kỳ Lừa, nàng Tô Thị và chùa Tam Thanh"
      ],
      "ans": 3,
      "explain": "'Đồng Đăng có phố Kỳ Lừa / Có nàng Tô Thị, có chùa Tam Thanh' là biểu tượng thi ca bất hủ về cảnh sắc xứ Lạng."
},
    questions: [
      {
            "q": "Địa danh văn hóa và thắng cảnh nổi tiếng nào ở Lạng Sơn đã đi vào văn học dân gian?",
            "options": [
                  "Động Phong Nha và sông Son",
                  "Ngũ Hành Sơn và sông Hàn",
                  "Chùa Yên Tử và chùa Đồng",
                  "Phố Kỳ Lừa, nàng Tô Thị và chùa Tam Thanh"
            ],
            "ans": 3,
            "explain": "'Đồng Đăng có phố Kỳ Lừa / Có nàng Tô Thị, có chùa Tam Thanh' là biểu tượng thi ca bất hủ về cảnh sắc xứ Lạng."
      },
      {
            "q": "Cửa khẩu Quốc tế Hữu Nghị tại Lạng Sơn giữ vị trí then chốt nào trong tuyến du lịch xuyên quốc gia?",
            "options": [
                  "Là cửa ngõ đường sắt và đường bộ lớn nhất kết nối Việt Nam với Trung Quốc và mạng lưới du lịch Á - Âu",
                  "Chỉ phục vụ khách bộ hành địa phương",
                  "Là cảng trung chuyển hàng không quốc tế",
                  "Là luồng hàng hải nội địa"
            ],
            "ans": 0,
            "explain": "Cửa khẩu Hữu Nghị là huyết mạch giao thương và du lịch quốc tế kết nối trực tiếp hành lang kinh tế Nam Ninh - Hà Nội."
      },
      {
            "q": "Điểm mua sắm trên tuyến du lịch đóng vai trò quan trọng nào đối với trải nghiệm chuyến đi?",
            "options": [
                  "Chỉ để thu phí đỗ xe",
                  "Thỏa mãn nhu cầu quà lưu niệm, hàng tiêu dùng và kích thích phát triển kinh tế địa phương",
                  "Bắt buộc du khách phải chi tiêu toàn bộ ngân sách",
                  "Thay thế hoàn toàn cho điểm tham quan di sản"
            ],
            "ans": 1,
            "explain": "Điểm mua sắm giúp thỏa mãn nhu cầu mang quà lưu niệm về cho người thân, đồng thời thúc đẩy tiêu thụ sản vật địa phương."
      }
]
  },
  {
    id: "VN-09",
    stt: 9,
    name: "Quảng Ninh",
    mergedFrom: "Giữ nguyên (Tỉnh Quảng Ninh)",
    regionCode: "V1",
    regionName: "Đông Bắc & Duyên hải Bắc Bộ",
    color: "#2CE5C3",
    x: 9.2,
    z: -35.2,
    polygon: [[6.8, -36.2], [12.2, -34.5], [11.5, -36.8], [7.2, -34.2]],
    hubs: [{ name: "Hạ Long", x: 9.0, z: -35.2 }],
    landmarkType: "halong",
    transport: [
      "Cao tốc xuyên tỉnh Hải Phòng - Hạ Long - Vân Đồn - Móng Cái",
      "Sân bay Quốc tế Vân Đồn",
      "Cảng tàu khách Quốc tế Hạ Long & Tuần Châu"
    ],
    attractions: [
      {
        name: "Di sản Thiên nhiên Thế giới Vịnh Hạ Long & Vịnh Bái Tử Long",
        cluster: "Cụm Kỳ quan Vịnh biển",
        desc: "Gần 2.000 hòn đảo đá vôi kỳ vĩ (Hòn Trống Mái, Đỉnh Hương, Đảo Ti Tốp, Hang Sửng Sốt, Động Thiên Cung) cùng dịch vụ du thuyền nghỉ đêm đẳng cấp."
      },
      {
        name: "Khu di tích & Danh thắng Yên Tử (Di sản Thế giới)",
        cluster: "Cụm Văn hóa - Tâm linh Trúc Lâm",
        desc: "Kinh đô Phật giáo Trúc Lâm Việt Nam gắn với Phật hoàng Trần Nhân Tông, Chùa Đồng trên đỉnh núi cao 1.068m."
      },
      {
        name: "Bình Liêu, Đảo Cô Tô, Quan Lạn & Móng Cái - Trà Cổ",
        cluster: "Cụm Biên giới & Hải đảo",
        desc: "Sống lưng khủng long Bình Liêu, Mũi Sa Vĩ địa đầu Đông Bắc và những bãi biển đảo nguyên sơ."
      }
    ],
    cuisine: ["Chả mực Hạ Long", "Sá sùng Quan Lạn", "Gà Tiên Yên", "Sam biển Hạ Long", "Rượu mơ Yên Tử"],
    routeAdvice: "Hình mẫu 'Một tỉnh - Đa trải nghiệm': Buổi sáng lễ Phật non thiêng Yên Tử, buổi chiều du thuyền trên kỳ quan Vịnh Hạ Long, ngày hôm sau khám phá biên giới Bình Liêu - Móng Cái.",
    quiz: {
      "q": "Di sản thiên nhiên thế giới nào ở vùng Đông Bắc Việt Nam hai lần được UNESCO vinh danh?",
      "options": [
            "Vịnh Hạ Long",
            "Vịnh Cam Ranh",
            "Vịnh Lăng Cô",
            "Vịnh Xuân Đài"
      ],
      "ans": 0,
      "explain": "Vịnh Hạ Long được UNESCO vinh danh di sản thế giới nhờ giá trị thẩm mỹ cảnh quan karst ngoại hạng và giá trị địa chất địa mạo toàn cầu."
},
    questions: [
      {
            "q": "Di sản thiên nhiên thế giới nào ở vùng Đông Bắc Việt Nam hai lần được UNESCO vinh danh?",
            "options": [
                  "Vịnh Hạ Long",
                  "Vịnh Cam Ranh",
                  "Vịnh Lăng Cô",
                  "Vịnh Xuân Đài"
            ],
            "ans": 0,
            "explain": "Vịnh Hạ Long được UNESCO vinh danh di sản thế giới nhờ giá trị thẩm mỹ cảnh quan karst ngoại hạng và giá trị địa chất địa mạo toàn cầu."
      },
      {
            "q": "Quần thể di tích danh thắng Yên Tử gắn liền với sự hình thành của dòng thiền phái nào?",
            "options": [
                  "Thiền phái Lâm Tế",
                  "Thiền phái Trúc Lâm Yên Tử do Phật hoàng Trần Nhân Tông sáng lập",
                  "Phật giáo Nam tông",
                  "Tịnh độ tông"
            ],
            "ans": 1,
            "explain": "Yên Tử là kinh đô Phật giáo của nước Đại Việt thế kỷ 13, nơi Phật hoàng Trần Nhân Tông sáng lập dòng thiền Trúc Lâm thuần Việt."
      },
      {
            "q": "Phương tiện vận chuyển du khách ngày nay có đặc điểm ưu việt gì giúp phát triển tuyến du lịch?",
            "options": [
                  "Trở nên chậm chạp và thiếu tiện nghi",
                  "Gây ô nhiễm và không có điều hòa",
                  "Rút ngắn thời gian đi lại và gia tăng thời gian tham quan trải nghiệm của du khách",
                  "Giảm tính tiện lợi so với trước"
            ],
            "ans": 2,
            "explain": "Phương tiện vận chuyển hiện đại (cao tốc, du thuyền 5 sao, máy bay) giúp rút ngắn đáng kể thời gian di chuyển, tối đa hóa thời gian vui chơi của du khách."
      }
]
  },
  {
    id: "VN-10",
    stt: 10,
    name: "Phú Thọ",
    mergedFrom: "Hợp nhất Phú Thọ + Vĩnh Phúc + Hòa Bình",
    regionCode: "V1",
    regionName: "Trung du & Miền núi phía Bắc",
    color: "#F5C71A",
    x: -1.8,
    z: -33.2,
    polygon: [[-4.2, -35.5], [0.5, -35.2], [0.8, -30.8], [-3.8, -30.5]],
    hubs: [
      { name: "Việt Trì", x: -1.5, z: -34.0 },
      { name: "Vĩnh Phúc", x: -0.2, z: -34.2 },
      { name: "Hòa Bình", x: -2.2, z: -31.8 }
    ],
    landmarkType: "temple_gate",
    transport: [
      "Cao tốc Nội Bài - Lào Cai",
      "Cao tốc Hòa Lạc - Hòa Bình",
      "Sông Đà - Sông Lô - Sông Hồng (Ngã ba Bạch Hạc)"
    ],
    attractions: [
      {
        name: "Khu di tích lịch sử Quốc gia đặc biệt Đền Hùng & Hát Xoan",
        cluster: "Cụm Đất Tổ (Phú Thọ)",
        desc: "Nơi thờ tự các Vua Hùng trên núi Nghĩa Lĩnh, Vườn quốc gia Xuân Sơn và Đồi chè Long Cốc."
      },
      {
        name: "Khu du lịch Quốc gia Tam Đảo & Danh thắng Tây Thiên",
        cluster: "Cụm Nghỉ dưỡng Vĩnh Phúc",
        desc: "Thị trấn trong sương Tam Đảo, Thiền viện Trúc Lâm Tây Thiên và Hồ Đại Lải."
      },
      {
        name: "Thung lũng Mai Châu, Lòng hồ Hòa Bình & Suối khoáng Kim Bôi",
        cluster: "Cụm Văn hóa Mường - Thái (Hòa Bình)",
        desc: "Bản Lác Mai Châu, Thủy điện Hòa Bình, Đền Thác Bờ và văn hóa Chiêng Mường."
      }
    ],
    cuisine: ["Thịt chua Thanh Sơn", "Cá anh vũ Việt Trì", "Ngọn su su Tam Đảo", "Cơm lam Mai Châu", "Cá nướng lòng hồ Hòa Bình"],
    routeAdvice: "Tuyến vành đai phía Tây Thủ đô Hà Nội cực kỳ đa dạng: Nghỉ dưỡng núi Tam Đảo ➔ Về nguồn Đền Hùng ➔ Trải nghiệm văn hóa Mai Châu - Hòa Bình.",
    quiz: {
      "q": "Khu di tích lịch sử Quốc gia đặc biệt Đền Hùng gắn liền với cội nguồn thiêng liêng nào của dân tộc ta?",
      "options": [
            "Triều đại nhà Nguyễn ở Huế",
            "Thời kỳ các Vua Hùng dựng nên nhà nước Văn Lang cổ đại",
            "Thời kỳ nhà Lê trung hưng",
            "Thời kỳ Pháp thuộc"
      ],
      "ans": 1,
      "explain": "Đền Hùng trên núi Nghĩa Lĩnh là nơi phụng thờ các Vua Hùng - tổ tiên chung dựng nước của cộng đồng các dân tộc Việt Nam."
},
    questions: [
      {
            "q": "Khu di tích lịch sử Quốc gia đặc biệt Đền Hùng gắn liền với cội nguồn thiêng liêng nào của dân tộc ta?",
            "options": [
                  "Triều đại nhà Nguyễn ở Huế",
                  "Thời kỳ các Vua Hùng dựng nên nhà nước Văn Lang cổ đại",
                  "Thời kỳ nhà Lê trung hưng",
                  "Thời kỳ Pháp thuộc"
            ],
            "ans": 1,
            "explain": "Đền Hùng trên núi Nghĩa Lĩnh là nơi phụng thờ các Vua Hùng - tổ tiên chung dựng nước của cộng đồng các dân tộc Việt Nam."
      },
      {
            "q": "Di sản văn hóa phi vật thể nào của Phú Thọ được UNESCO công nhận là di sản văn hóa đại diện của nhân loại?",
            "options": [
                  "Đờn ca tài tử",
                  "Dân ca Ví, Giặm",
                  "Hát Xoan Phú Thọ và Tín ngưỡng thờ cúng Hùng Vương",
                  "Không gian văn hóa Cồng chiêng"
            ],
            "ans": 2,
            "explain": "Hát Xoan Phú Thọ và Tín ngưỡng thờ cúng Hùng Vương là hai di sản thế giới vô giá khẳng định truyền thống uống nước nhớ nguồn của dân tộc."
      },
      {
            "q": "Tour và tuyến du lịch có điểm khác biệt căn bản nào theo lý thuyết nghiệp vụ du lịch?",
            "options": [
                  "Tuyến là dịch vụ ăn uống, Tour là dịch vụ ngủ nghỉ",
                  "Tuyến và Tour hoàn toàn đồng nghĩa và không khác nhau",
                  "Tour chỉ dành cho khách đi bộ, Tuyến chỉ dành cho máy bay",
                  "Tuyến là lộ trình không gian liên kết các điểm; Tour là chương trình du lịch trọn gói bao gồm lịch trình thời gian, dịch vụ và chi phí"
            ],
            "ans": 3,
            "explain": "Tuyến xác định hướng di chuyển không gian kết nối các điểm; còn Tour là sản phẩm dịch vụ trọn gói có định lượng thời gian, giá bán và dịch vụ đi kèm."
      }
]
  },

  // ================= VÙNG 2: ĐỒNG BẰNG SÔNG HỒNG (5) =================
  {
    id: "VN-11",
    stt: 11,
    name: "Bắc Ninh",
    mergedFrom: "Hợp nhất Bắc Ninh + Bắc Giang",
    regionCode: "V2",
    regionName: "Đồng bằng sông Hồng & Kinh Bắc",
    color: "#F05A22",
    x: 4.5,
    z: -34.2,
    polygon: [[2.2, -35.8], [6.8, -35.5], [6.5, -33.0], [2.5, -33.2]],
    hubs: [
      { name: "Bắc Giang", x: 4.8, z: -34.8 },
      { name: "Bắc Ninh", x: 3.8, z: -33.6 }
    ],
    landmarkType: "pagoda",
    transport: ["Cao tốc Hà Nội - Bắc Giang - Lạng Sơn", "QL1A, QL18 kết nối Nội Bài - Hạ Long"],
    attractions: [
      {
        name: "Không gian Văn hóa Quan họ & Hệ thống Cổ tự Kinh Bắc",
        cluster: "Cụm Văn hóa Bắc Ninh",
        desc: "Đền Đô (thờ 8 vị vua nhà Lý), Chùa Phật Tích, Chùa Bút Tháp, Chùa Dâu và Làng tranh dân gian Đông Hồ."
      },
      {
        name: "Khu tâm linh - sinh thái Tây Yên Tử & Chùa Vĩnh Nghiêm",
        cluster: "Cụm Bắc Giang",
        desc: "Chùa Vĩnh Nghiêm (nơi lưu giữ Mộc bản kinh Phật - Di sản tư liệu UNESCO), Chùa Bổ Đà và con đường Hoằng dương Phật pháp Tây Yên Tử."
      },
      {
        name: "Khu di tích Khởi nghĩa Yên Thế & Vùng vải thiều Lục Ngạn",
        cluster: "Cụm Sinh thái Nông nghiệp",
        desc: "Hồ Khuôn Thần, Hồ Cấm Sơn và du lịch miệt vườn vải thiều Lục Ngạn."
      }
    ],
    cuisine: ["Bánh phu thê Đình Bảng", "Vải thiều Lục Ngạn", "Mì Chũ", "Bánh đa Kế", "Gà đồi Yên Thế"],
    routeAdvice: "Tái thống nhất trọn vẹn vùng văn hóa Kinh Bắc cổ, kết nối trực tiếp với Quảng Ninh và Hải Phòng tạo thành cung đường Di sản Phật giáo Trúc Lâm.",
    quiz: {
      "q": "Di sản văn hóa phi vật thể Quan họ Bắc Ninh được UNESCO công nhận vào năm nào?",
      "options": [
            "Năm 2005",
            "Năm 2012",
            "Năm 2009",
            "Năm 2018"
      ],
      "ans": 2,
      "explain": "Dân ca Quan họ Bắc Ninh với lối hát đối đáp giao duyên mượt mà và nền văn hóa ứng xử trọng tình đã được UNESCO vinh danh năm 2009."
},
    questions: [
      {
            "q": "Di sản văn hóa phi vật thể Quan họ Bắc Ninh được UNESCO công nhận vào năm nào?",
            "options": [
                  "Năm 2005",
                  "Năm 2012",
                  "Năm 2009",
                  "Năm 2018"
            ],
            "ans": 2,
            "explain": "Dân ca Quan họ Bắc Ninh với lối hát đối đáp giao duyên mượt mà và nền văn hóa ứng xử trọng tình đã được UNESCO vinh danh năm 2009."
      },
      {
            "q": "Chùa Phật Tích và Chùa Dâu ở xứ Kinh Bắc là cái nôi của:",
            "options": [
                  "Nghệ thuật đúc đồng hiện đại",
                  "Khu sản xuất đồ nhựa",
                  "Các xưởng đóng tàu thủy cổ",
                  "Phật giáo Việt Nam cổ xưa với hệ thống kiến trúc chùa tháp và tượng Phật A Di Đà bằng đá cổ nhất"
            ],
            "ans": 3,
            "explain": "Chùa Dâu là trung tâm Phật giáo cổ xưa nhất Việt Nam thế kỷ thứ 2, lưu giữ những báu vật điêu khắc tượng đá thời Lý tại chùa Phật Tích."
      },
      {
            "q": "Hệ thống làng nghề truyền thống như gốm Phù Lãng, tranh Đông Hồ, đúc đồng Đại Bái thuộc nhóm tài nguyên du lịch nào?",
            "options": [
                  "Tài nguyên du lịch nhân văn gắn với văn hóa nghề thủ công truyền thống",
                  "Tài nguyên du lịch tự nhiên rừng núi",
                  "Tài nguyên du lịch thể thao mạo hiểm",
                  "Tài nguyên năng lượng tái tạo"
            ],
            "ans": 0,
            "explain": "Làng nghề thủ công truyền thống là tài nguyên nhân văn đặc sắc, thu hút du khách tìm hiểu kỹ nghệ chạm khắc, in tranh và làm gốm cổ truyền."
      }
]
  },
  {
    id: "VN-12",
    stt: 12,
    name: "TP. Hà Nội",
    mergedFrom: "Giữ nguyên (Thủ đô Hà Nội)",
    regionCode: "V2",
    regionName: "Đồng bằng sông Hồng",
    color: "#0047BA",
    x: 1.2,
    z: -32.8,
    polygon: [[-0.2, -33.8], [2.5, -33.5], [2.4, -31.2], [-0.2, -31.5]],
    hubs: [{ name: "Hà Nội", x: 1.2, z: -32.6 }],
    landmarkType: "khue_van_cac",
    transport: [
      "Cảng Hàng không Quốc tế Nội Bài",
      "Tâm điểm 7 tuyến Cao tốc hướng tâm",
      "Đường sắt Quốc gia & Đường sắt đô thị"
    ],
    attractions: [
      {
        name: "Hoàng thành Thăng Long, Văn Miếu - Quốc Tử Giám & Hồ Hoàn Kiếm",
        cluster: "Cụm Di sản Trung tâm",
        desc: "Di sản Văn hóa Thế giới Hoàng thành Thăng Long, Khuê Văn Các - trường đại học đầu tiên của Việt Nam, Tháp Rùa - Đền Ngọc Sơn và 36 phố phường."
      },
      {
        name: "Lăng Chủ tịch Hồ Chí Minh & Chùa Một Cột",
        cluster: "Cụm Quảng trường Ba Đình",
        desc: "Quần thể di tích lịch sử - chính trị thiêng liêng bậc nhất của cả nước."
      },
      {
        name: "Chùa Hương, Làng cổ Đường Lâm, Làng gốm Bát Tràng & Ba Vì",
        cluster: "Cụm Ngoại thành & Làng nghề",
        desc: "Danh thắng Hương Sơn, Thành cổ Cổ Loa, Vườn quốc gia Ba Vì và hệ thống làng nghề truyền thống ngàn năm."
      }
    ],
    cuisine: ["Phở Hà Nội", "Bún chả", "Chả cá Lã Vọng", "Cốm làng Vòng", "Cà phê trứng", "Bánh tôm Hồ Tây"],
    routeAdvice: "Trung tâm phân phối khách quốc tế và nội địa lớn nhất miền Bắc (Hub & Spoke) tỏa đi 33 tỉnh thành còn lại.",
    quiz: {
      "q": "Thủ đô Hà Nội giữ vai trò then chốt nào trong hệ thống mạng lưới du lịch của vùng Bắc Bộ và cả nước?",
      "options": [
            "Là vùng phụ cận không có di sản thế giới",
            "Là điểm du lịch nông thôn đơn thuần",
            "Chỉ đón khách bằng tàu thủy nội địa",
            "Là trung tâm đầu não chính trị, văn hóa, kinh tế và là trung tâm phân phối khách du lịch lớn nhất miền Bắc"
      ],
      "ans": 3,
      "explain": "Hà Nội là trái tim của cả nước, sở hữu sân bay quốc tế Nội Bài và hệ thống di sản nghìn năm văn hiến (Hoàng thành Thăng Long, Văn Miếu, Phố cổ)."
},
    questions: [
      {
            "q": "Thủ đô Hà Nội giữ vai trò then chốt nào trong hệ thống mạng lưới du lịch của vùng Bắc Bộ và cả nước?",
            "options": [
                  "Là vùng phụ cận không có di sản thế giới",
                  "Là điểm du lịch nông thôn đơn thuần",
                  "Chỉ đón khách bằng tàu thủy nội địa",
                  "Là trung tâm đầu não chính trị, văn hóa, kinh tế và là trung tâm phân phối khách du lịch lớn nhất miền Bắc"
            ],
            "ans": 3,
            "explain": "Hà Nội là trái tim của cả nước, sở hữu sân bay quốc tế Nội Bài và hệ thống di sản nghìn năm văn hiến (Hoàng thành Thăng Long, Văn Miếu, Phố cổ)."
      },
      {
            "q": "Di sản văn hóa thế giới Hoàng thành Thăng Long minh chứng cho điều gì trong lịch sử dân tộc?",
            "options": [
                  "Trung tâm quyền lực chính trị liên tục suốt 13 thế kỷ qua các triều đại Lý, Trần, Lê, Mạc, Nguyễn",
                  "Lịch sử giao lưu hàng hải của phương Tây",
                  "Một công trình giải trí thời hiện đại",
                  "Một khu công nghiệp dệt may cổ"
            ],
            "ans": 0,
            "explain": "Hoàng thành Thăng Long là minh chứng sống động duy nhất về sự tiếp nối liên tục của trung tâm quyền lực nhà nước phong kiến Việt Nam."
      },
      {
            "q": "Điểm du lịch đô thị như Hà Nội phát triển chủ yếu theo loại hình du lịch nào?",
            "options": [
                  "Chỉ khai thác du lịch lặn biển ngắm san hô",
                  "Du lịch gắn với văn hóa, lịch sử, ẩm thực, mua sắm và du lịch công vụ (MICE)",
                  "Chỉ phát triển du lịch săn bắn động vật hoang dã",
                  "Du lịch leo núi băng giá"
            ],
            "ans": 1,
            "explain": "Du lịch đô thị phát triển mạnh nhờ cơ sở hạ tầng hiện đại, các bảo tàng, phố đi bộ, ẩm thực đường phố nức tiếng và dịch vụ hội nghị MICE."
      }
]
  },
  {
    id: "VN-13",
    stt: 13,
    name: "TP. Hải Phòng",
    mergedFrom: "Hợp nhất TP. Hải Phòng + Hải Dương",
    regionCode: "V2",
    regionName: "Đồng bằng sông Hồng & Duyên hải",
    color: "#34D399",
    x: 6.2,
    z: -32.6,
    polygon: [[4.0, -33.2], [8.2, -33.0], [8.0, -31.2], [4.2, -31.4]],
    hubs: [
      { name: "Hải Phòng", x: 7.0, z: -32.4 },
      { name: "Hải Dương", x: 4.8, z: -32.4 }
    ],
    landmarkType: "port_island",
    transport: [
      "Sân bay Quốc tế Cát Bi",
      "Cao tốc Hà Nội - Hải Phòng",
      "Cảng biển Quốc tế Lạch Huyện, Cáp treo Cát Bà"
    ],
    attractions: [
      {
        name: "Quần đảo Cát Bà & Vịnh Lan Hạ (Di sản Thiên nhiên Thế giới)",
        cluster: "Cụm Biển đảo Hải Phòng",
        desc: "Khu dự trữ sinh quyển thế giới và Di sản thiên nhiên thế giới liên tỉnh (Vịnh Hạ Long - Quần đảo Cát Bà), Khu du lịch Đồ Sơn."
      },
      {
        name: "Khu di tích Quốc gia đặc biệt Côn Sơn - Kiếp Bạc",
        cluster: "Cụm Văn hóa Xứ Đông (Hải Dương)",
        desc: "Gắn liền với Anh hùng dân tộc Hưng Đạo Đại Vương Trần Quốc Tuấn và Danh nhân văn hóa thế giới Nguyễn Trãi."
      },
      {
        name: "Foodtour Nội đô Hải Phòng & Đảo Cò Chi Lăng Nam",
        cluster: "Cụm Đô thị & Sinh thái",
        desc: "Nhà hát lớn Hải Phòng, Bạch Đằng Giang, Văn Miếu Mao Điền và trải nghiệm ẩm thực đường phố."
      }
    ],
    cuisine: ["Bánh đa cua Hải Phòng", "Nem cua bể", "Bánh đậu xanh Hải Dương", "Vải thiều Thanh Hà", "Chả rươi Tứ Kỳ"],
    routeAdvice: "Kết nối Côn Sơn - Kiếp Bạc với Yên Tử (Quảng Ninh) và Vĩnh Nghiêm (Bắc Ninh), đồng thời kết nối Vịnh Lan Hạ (Cát Bà) với Vịnh Hạ Long.",
    quiz: {
      "q": "Đảo Cát Bà (Hải Phòng) cùng với Vịnh Hạ Long đã được UNESCO công nhận là di sản nào vào năm 2023?",
      "options": [
            "Di sản Thiên nhiên Thế giới liên tỉnh Vịnh Hạ Long - Quần đảo Cát Bà",
            "Di sản Ký ức Tư liệu Thế giới",
            "Công viên địa chất sa mạc",
            "Khu bảo tồn động vật bắc cực"
      ],
      "ans": 0,
      "explain": "Quần thể Vịnh Hạ Long - Quần đảo Cát Bà là di sản thiên nhiên thế giới liên tỉnh đầu tiên của Việt Nam với đa dạng sinh học rừng và biển đảo kỳ vĩ."
},
    questions: [
      {
            "q": "Đảo Cát Bà (Hải Phòng) cùng với Vịnh Hạ Long đã được UNESCO công nhận là di sản nào vào năm 2023?",
            "options": [
                  "Di sản Thiên nhiên Thế giới liên tỉnh Vịnh Hạ Long - Quần đảo Cát Bà",
                  "Di sản Ký ức Tư liệu Thế giới",
                  "Công viên địa chất sa mạc",
                  "Khu bảo tồn động vật bắc cực"
            ],
            "ans": 0,
            "explain": "Quần thể Vịnh Hạ Long - Quần đảo Cát Bà là di sản thiên nhiên thế giới liên tỉnh đầu tiên của Việt Nam với đa dạng sinh học rừng và biển đảo kỳ vĩ."
      },
      {
            "q": "Lễ hội Chọi trâu Đồ Sơn mang ý nghĩa văn hóa nhân văn đặc sắc nào?",
            "options": [
                  "Lễ hội mùa lúa chín vùng núi",
                  "Tục thờ thủy thần và tinh thần thượng võ kiên cường của cư dân vùng biển Hải Phòng",
                  "Hội thi hoa hậu quốc tế",
                  "Hội chợ triển lãm xe hơi"
            ],
            "ans": 1,
            "explain": "Lễ hội Chọi trâu Đồ Sơn gắn liền với tín ngưỡng thờ cúng thủy thần và lời thề biển cả của ngư dân miền cửa sóng."
      },
      {
            "q": "Đặc điểm của giao thông vận tải đường biển trong việc phát triển du lịch tại Hải Phòng là gì?",
            "options": [
                  "Chỉ dành cho thuyền thúng chèo tay",
                  "Bị cấm lưu thông mọi phương tiện du lịch",
                  "Có hệ thống cảng biển quốc tế nước sâu và bến tàu cao tốc kết nối các đảo du lịch nhanh chóng, an toàn",
                  "Không có bất kỳ âu tàu nào"
            ],
            "ans": 2,
            "explain": "Hải Phòng sở hữu hệ thống cảng biển lớn nhất miền Bắc và cáp treo vượt biển, phà cao tốc kết nối đảo Cát Bà tiện lợi."
      }
]
  },
  {
    id: "VN-14",
    stt: 14,
    name: "Hưng Yên",
    mergedFrom: "Hợp nhất Hưng Yên + Thái Bình",
    regionCode: "V2",
    regionName: "Đồng bằng sông Hồng",
    color: "#F59E0B",
    x: 4.5,
    z: -30.5,
    polygon: [[2.6, -32.2], [6.8, -31.4], [6.5, -29.2], [3.0, -29.8]],
    hubs: [
      { name: "Hưng Yên", x: 3.4, z: -31.5 },
      { name: "Thái Bình", x: 5.5, z: -30.0 }
    ],
    landmarkType: "pagoda",
    transport: ["Cao tốc Hà Nội - Hải Phòng, Tuyến đường bộ ven biển Hải Phòng - Thái Bình - Ninh Bình"],
    attractions: [
      {
        name: "Khu di tích Quốc gia đặc biệt Phố Hiến & Đền Chử Đồng Tử",
        cluster: "Cụm Văn hóa Hưng Yên",
        desc: "'Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến' với Văn Miếu Xích Đằng, Chùa Chuông, Đền Mẫu, Làng cổ Nôm và khu đô thị Ecopark."
      },
      {
        name: "Chùa Keo (Di tích Quốc gia đặc biệt) & Đền Trần Thái Bình",
        cluster: "Cụm Kiến trúc Cổ Thái Bình",
        desc: "Kiệt tác kiến trúc gỗ cổ truyền Việt Nam thế kỷ XVII với Gác chuông Chùa Keo cao 3 tầng mái."
      },
      {
        name: "Biển Cồn Vành, Cồn Đen & Rừng ngập mặn Thái Thụy",
        cluster: "Cụm Sinh thái Biển",
        desc: "Biển vô cực Quang Lang, rừng ngập mặn ven biển thuộc Khu dự trữ sinh quyển châu thổ sông Hồng."
      }
    ],
    cuisine: ["Nhãn lồng Hưng Yên", "Gà Đông Tảo", "Bánh cáy làng Nguyễn", "Canh cá Quỳnh Côi", "Bún thang lươn Phố Hiến"],
    routeAdvice: "Sau sáp nhập, Hưng Yên không còn là tỉnh nội đồng mà vươn thẳng ra biển Đông qua cửa biển Thái Bình (Cồn Vành - Cồn Đen).",
    quiz: {
      "q": "Thương cảng Phố Hiến (Hưng Yên) trong lịch sử từng nổi danh với câu phương ngôn nào?",
      "options": [
            "Đến đây thì ở lại đây",
            "Thứ nhất Kinh kỳ, thứ nhì Phố Hiến",
            "Bắc Cần Thơ, Nam Phố Hiến",
            "Non xanh nước biếc như tranh họa đồ"
      ],
      "ans": 1,
      "explain": "Vào thế kỷ 17, Phố Hiến là thương cảng quốc tế sầm uất bậc nhất Đàng Ngoài, nơi giao thương buôn bán của thương nhân Hà Lan, Nhật Bản, Trung Hoa."
},
    questions: [
      {
            "q": "Thương cảng Phố Hiến (Hưng Yên) trong lịch sử từng nổi danh với câu phương ngôn nào?",
            "options": [
                  "Đến đây thì ở lại đây",
                  "Thứ nhất Kinh kỳ, thứ nhì Phố Hiến",
                  "Bắc Cần Thơ, Nam Phố Hiến",
                  "Non xanh nước biếc như tranh họa đồ"
            ],
            "ans": 1,
            "explain": "Vào thế kỷ 17, Phố Hiến là thương cảng quốc tế sầm uất bậc nhất Đàng Ngoài, nơi giao thương buôn bán của thương nhân Hà Lan, Nhật Bản, Trung Hoa."
      },
      {
            "q": "Sản vật ẩm thực trứ danh nào của đất Hưng Yên từng là vật phẩm cung tiến nhà vua?",
            "options": [
                  "Thanh long ruột đỏ",
                  "Sầu riêng Cái Mơn",
                  "Nhãn lồng tiến vua Hưng Yên và Chè sen long nhãn",
                  "Vú sữa Lò Rèn"
            ],
            "ans": 2,
            "explain": "Nhãn lồng Hưng Yên cùi dày ráo nước, ngọt thơm thanh mát, là sản vật cung tiến các vị vua chúa thời xưa."
      },
      {
            "q": "Vai trò chính của tuyến du lịch trong việc phân bố luồng khách là:",
            "options": [
                  "Làm tăng ùn tắc giao thông cục bộ",
                  "Không cho phép du khách đổi hướng hành trình",
                  "Bắt buộc khách chỉ ở lại một điểm duy nhất",
                  "Tạo ra lộ trình thuận tiện, kết nối các điểm tham quan hợp lý và điều hòa lưu lượng khách"
            ],
            "ans": 3,
            "explain": "Tuyến du lịch liên kết hợp lý giúp phân luồng khách thông suốt, giảm tải cục bộ và phát huy giá trị đồng bộ của cả chuỗi điểm đến."
      }
]
  },
  {
    id: "VN-15",
    stt: 15,
    name: "Ninh Bình",
    mergedFrom: "Hợp nhất Ninh Bình + Hà Nam + Nam Định",
    regionCode: "V2",
    regionName: "Đồng bằng sông Hồng",
    color: "#F05A22",
    x: 2.2,
    z: -29.0,
    polygon: [[-0.2, -31.2], [3.2, -30.5], [4.8, -28.0], [0.5, -27.8]],
    hubs: [
      { name: "Phủ Lý", x: 1.5, z: -30.5 },
      { name: "Nam Định", x: 3.5, z: -29.2 },
      { name: "Hoa Lư (Ninh Bình)", x: 1.2, z: -28.5 }
    ],
    landmarkType: "trang_an",
    transport: ["Cao tốc Pháp Vân - Cầu Giẽ - Cao Bồ - Mai Sơn", "Đường sắt Bắc - Nam, Tuyến ven biển"],
    attractions: [
      {
        name: "Quần thể Danh thắng Tràng An (Di sản Kép Thế giới UNESCO)",
        cluster: "Cụm Cố đô Hoa Lư (Ninh Bình)",
        desc: "Di sản Văn hóa và Thiên nhiên Thế giới duy nhất ở Đông Nam Á: Tràng An, Tam Cốc - Bích Động, Cố đô Hoa Lư, Chùa Bái Đính, Hang Múa, VQG Cúc Phương."
      },
      {
        name: "Khu du lịch Quốc gia Tam Chúc & Chùa Địa Tạng Phi Lai",
        cluster: "Cụm Tâm linh Hà Nam",
        desc: "Quần thể du lịch tâm linh quy mô lớn gắn với trục cảnh quan đá vôi ngập nước."
      },
      {
        name: "Khu di tích Đền Trần - Chùa Phổ Minh, Phủ Dầy & VQG Xuân Thủy",
        cluster: "Cụm Văn hóa Trần & Biển Nam Định",
        desc: "Đất phát tích vương triều Trần, Trung tâm Tín ngưỡng thờ Mẫu Tam phủ (UNESCO) và Khu Ramsar đầu tiên của Đông Nam Á (Xuân Thủy)."
      }
    ],
    cuisine: ["Thịt dê & Cơm cháy Ninh Bình", "Phở bò Nam Định", "Cá kho làng Vũ Đại", "Chuối ngự Đại Hoàng", "Bánh xíu páo"],
    routeAdvice: "Siêu trung tâm du lịch Văn hóa - Tâm linh - Sinh thái Nam Đồng bằng sông Hồng: Tam Chúc ➔ Bái Đính - Tràng An ➔ Đền Trần - Phủ Dầy.",
    quiz: {
      "q": "Quần thể danh thắng Tràng An (Ninh Bình) tự hào là di sản thế giới duy nhất ở Đông Nam Á đạt danh hiệu gì?",
      "options": [
            "Di sản ký ức tư liệu",
            "Di sản phi vật thể đơn thuần",
            "Di sản thế giới hỗn hợp (cả giá trị Văn hóa và giá trị Thiên nhiên)",
            "Di sản khảo cổ học đồ sắt"
      ],
      "ans": 2,
      "explain": "Tràng An được UNESCO vinh danh là Di sản Văn hóa và Thiên nhiên Thế giới nhờ cảnh quan karst nhiệt đới ngập nước và dấu tích người tiền sử cư trú."
},
    questions: [
      {
            "q": "Quần thể danh thắng Tràng An (Ninh Bình) tự hào là di sản thế giới duy nhất ở Đông Nam Á đạt danh hiệu gì?",
            "options": [
                  "Di sản ký ức tư liệu",
                  "Di sản phi vật thể đơn thuần",
                  "Di sản thế giới hỗn hợp (cả giá trị Văn hóa và giá trị Thiên nhiên)",
                  "Di sản khảo cổ học đồ sắt"
            ],
            "ans": 2,
            "explain": "Tràng An được UNESCO vinh danh là Di sản Văn hóa và Thiên nhiên Thế giới nhờ cảnh quan karst nhiệt đới ngập nước và dấu tích người tiền sử cư trú."
      },
      {
            "q": "Cố đô Hoa Lư là kinh đô của những triều đại phong kiến nào trong lịch sử Đại Cồ Việt?",
            "options": [
                  "Nhà Tây Sơn",
                  "Nhà Nguyễn",
                  "Nhà Hồ",
                  "Nhà Đinh, Tiền Lê và thời kỳ đầu nhà Lý"
            ],
            "ans": 3,
            "explain": "Hoa Lư là kinh đô đầu tiên của nhà nước phong kiến trung ương tập quyền Việt Nam dưới thời Vua Đinh Tiên Hoàng và Vua Lê Đại Hành."
      },
      {
            "q": "Tại điểm du lịch Tràng An - Tam Cốc, loại hình vận chuyển truyền thống nào được du khách quốc tế ưa chuộng?",
            "options": [
                  "Thuyền nan chèo tay của cư dân địa phương luồn qua các hang động karst",
                  "Xe tăng lội nước",
                  "Tàu đệm khí công suất lớn",
                  "Mô tô nước tốc độ cao"
            ],
            "ans": 0,
            "explain": "Thuyền nan truyền thống do chính người dân bản địa chèo lái mang đến trải nghiệm thanh bình, thân thiện môi trường và an toàn cho du khách."
      }
]
  },

  // ================= VÙNG 3: BẮC TRUNG BỘ & DUYÊN HẢI MIỀN TRUNG (8) =================
  {
    id: "VN-16",
    stt: 16,
    name: "Thanh Hóa",
    mergedFrom: "Giữ nguyên (Tỉnh Thanh Hóa)",
    regionCode: "V3",
    regionName: "Bắc Trung Bộ & Duyên hải Miền Trung",
    color: "#2CE5C3",
    x: -0.5,
    z: -25.2,
    polygon: [[-4.8, -29.0], [1.8, -27.5], [2.2, -23.0], [-3.2, -23.5]],
    hubs: [{ name: "Thanh Hóa", x: 0.5, z: -25.2 }],
    landmarkType: "citadel",
    transport: [
      "Sân bay Thọ Xuân",
      "Cao tốc Mai Sơn - Quốc lộ 45 - Nghi Sơn",
      "Đường sắt Bắc - Nam, Cảng Nghi Sơn"
    ],
    attractions: [
      {
        name: "Di sản Văn hóa Thế giới Thành Nhà Hồ & Khu di tích Lam Kinh",
        cluster: "Cụm Di sản Lịch sử",
        desc: "Tòa thành đá độc nhất vô nhị xây dựng năm 1397 và Kinh đô Lam Kinh của vương triều Hậu Lê."
      },
      {
        name: "Đô thị Du lịch Biển Sầm Sơn, Hải Tiến, Hải Hòa",
        cluster: "Cụm Nghỉ dưỡng Biển",
        desc: "Trung tâm du lịch biển sôi động hàng đầu miền Bắc và Bắc Trung Bộ."
      },
      {
        name: "Khu bảo tồn thiên nhiên Pù Luông, Suối cá thần Cẩm Thủy & Bến En",
        cluster: "Cụm Sinh thái Miền Tây",
        desc: "Ruộng bậc thang và guồng nước Pù Luông, Vườn quốc gia Bến En."
      }
    ],
    cuisine: ["Nem chua Thanh Hóa", "Chả tôm", "Bánh gai Tứ Trụ", "Vịt Cổ Lũng (Pù Luông)", "Hải sản Sầm Sơn"],
    routeAdvice: "Cửa ngõ chuyển tiếp giữa Bắc Bộ và Trung Bộ, có đầy đủ hệ sinh thái Núi (Pù Luông) - Trung du (Thành Nhà Hồ, Lam Kinh) - Biển (Sầm Sơn).",
    quiz: {
      "q": "Di sản Văn hóa Thế giới nào ở Thanh Hóa được xây dựng bằng các khối đá lớn độc nhất vô nhị ở Đông Nam Á?",
      "options": [
            "Kinh thành Thăng Long",
            "Cổ Loa thành",
            "Hoàng thành Huế",
            "Thành Nhà Hồ (Tây Đô)"
      ],
      "ans": 3,
      "explain": "Thành Nhà Hồ do Hồ Quý Ly xây dựng năm 1397 là công trình kiến trúc đá kỳ vĩ, được UNESCO vinh danh Di sản Văn hóa Thế giới năm 2011."
},
    questions: [
      {
            "q": "Di sản Văn hóa Thế giới nào ở Thanh Hóa được xây dựng bằng các khối đá lớn độc nhất vô nhị ở Đông Nam Á?",
            "options": [
                  "Kinh thành Thăng Long",
                  "Cổ Loa thành",
                  "Hoàng thành Huế",
                  "Thành Nhà Hồ (Tây Đô)"
            ],
            "ans": 3,
            "explain": "Thành Nhà Hồ do Hồ Quý Ly xây dựng năm 1397 là công trình kiến trúc đá kỳ vĩ, được UNESCO vinh danh Di sản Văn hóa Thế giới năm 2011."
      },
      {
            "q": "Đô thị du lịch biển Sầm Sơn thuộc loại hình tài nguyên du lịch nào?",
            "options": [
                  "Tài nguyên du lịch biển - khí hậu mùa hạ ấm áp, bãi cát thoai thoải và sóng biển lý tưởng",
                  "Tài nguyên suối khoáng băng tuyết",
                  "Tài nguyên hang động núi cao",
                  "Tài nguyên rừng lá kim ôn đới"
            ],
            "ans": 0,
            "explain": "Sầm Sơn là một trong những trung tâm nghỉ mát tắm biển ra đời sớm nhất miền Bắc với bãi cát mịn thoai thoải và bờ biển lộng gió."
      },
      {
            "q": "Điểm du lịch thiên nhiên chủ yếu tập trung khai thác giá trị nào?",
            "options": [
                  "Sự hiện đại của các trung tâm mua sắm",
                  "Các giá trị của tài nguyên thiên nhiên (cảnh quan, khí hậu, sinh thái, bờ biển)",
                  "Các nhà máy luyện kim",
                  "Hệ thống nhà ga đường sắt"
            ],
            "ans": 1,
            "explain": "Điểm du lịch thiên nhiên hấp dẫn du khách nhờ vẻ đẹp nguyên sơ của cảnh quan, sự trong lành của khí hậu và đa dạng sinh thái."
      }
]
  },
  {
    id: "VN-17",
    stt: 17,
    name: "Nghệ An",
    mergedFrom: "Giữ nguyên (Tỉnh Nghệ An)",
    regionCode: "V3",
    regionName: "Bắc Trung Bộ & Duyên hải Miền Trung",
    color: "#F5C71A",
    x: -2.2,
    z: -20.2,
    polygon: [[-7.2, -23.5], [1.5, -22.5], [2.0, -17.8], [-5.0, -18.5]],
    hubs: [{ name: "Vinh", x: 1.0, z: -19.2 }],
    landmarkType: "lotus_house",
    transport: [
      "Sân bay Quốc tế Vinh",
      "Cao tốc Diễn Châu - Bãi Vọt",
      "Đường sắt Bắc - Nam, Đường Hồ Chí Minh"
    ],
    attractions: [
      {
        name: "Khu di tích Quốc gia đặc biệt Kim Liên (Nam Đàn)",
        cluster: "Cụm Về nguồn",
        desc: "Làng Sen quê nội, Làng Hoàng Trù quê ngoại của Chủ tịch Hồ Chí Minh và Khu mộ bà Hoàng Thị Loan."
      },
      {
        name: "Đô thị Biển Cửa Lò & Đảo Lan Châu - Đảo Ngư",
        cluster: "Cụm Du lịch Biển",
        desc: "Bãi biển Cửa Lò thoai thoải, cáp treo ra đảo Hòn Ngư và du lịch nghỉ dưỡng ven biển."
      },
      {
        name: "Vườn quốc gia Pù Mát, Đồi chè Thanh Chương & Mường Lống",
        cluster: "Cụm Sinh thái Miền Tây Nghệ An",
        desc: "Khu dự trữ sinh quyển thế giới miền Tây Nghệ An với Thác Khe Kèm, đập Phà Lài và ốc đảo chè Thanh Chương."
      }
    ],
    cuisine: ["Cháo lươn & Súp lươn Nghệ An", "Mực nháy Cửa Lò", "Nhút Thanh Chương", "Tương Nam Đàn", "Cam Xã Đoài"],
    routeAdvice: "Điểm nhấn cốt lõi trên 'Con đường Di sản Miền Trung' và hành trình về nguồn xuyên Việt.",
    quiz: {
      "q": "Khu di tích Quốc gia đặc biệt Kim Liên (Nam Đàn, Nghệ An) là quê hương của vị lãnh tụ vĩ đại nào?",
      "options": [
            "Chủ tịch Hồ Chí Minh",
            "Đại tướng Võ Nguyên Giáp",
            "Tổng Bí thư Lê Duẩn",
            "Cụ Phan Bội Châu"
      ],
      "ans": 0,
      "explain": "Kim Liên là quê nội làng Sen và quê ngoại làng Hoàng Trù nơi Bác Hồ kính yêu sinh ra và trải qua những năm tháng tuổi thơ ấu."
},
    questions: [
      {
            "q": "Khu di tích Quốc gia đặc biệt Kim Liên (Nam Đàn, Nghệ An) là quê hương của vị lãnh tụ vĩ đại nào?",
            "options": [
                  "Chủ tịch Hồ Chí Minh",
                  "Đại tướng Võ Nguyên Giáp",
                  "Tổng Bí thư Lê Duẩn",
                  "Cụ Phan Bội Châu"
            ],
            "ans": 0,
            "explain": "Kim Liên là quê nội làng Sen và quê ngoại làng Hoàng Trù nơi Bác Hồ kính yêu sinh ra và trải qua những năm tháng tuổi thơ ấu."
      },
      {
            "q": "Làn điệu dân ca nào của xứ Nghệ đã được UNESCO vinh danh là Di sản Văn hóa phi vật thể đại diện của nhân loại?",
            "options": [
                  "Hát Chèo đồng bằng",
                  "Dân ca Ví, Giặm Nghệ Tĩnh",
                  "Ca trù",
                  "Hát Đúm"
            ],
            "ans": 1,
            "explain": "Dân ca Ví, Giặm Nghệ Tĩnh là tiếng lòng tâm tình sâu lắng, gắn liền với nếp lao động sản xuất trên đồng ruộng và dòng sông Lam."
      },
      {
            "q": "Điều kiện khí hậu gió phơn Tây Nam (gió Lào) khô nóng vào mùa hạ ở Bắc Trung Bộ đòi hỏi người điều hành tour phải lưu ý điều gì?",
            "options": [
                  "Hủy bỏ toàn bộ các bữa ăn",
                  "Bắt du khách phơi nắng giữa trưa",
                  "Bố trí thời gian tham quan ngoài trời vào buổi sáng sớm hoặc chiều mát, bổ sung nước giải khát và phương tiện điều hòa",
                  "Không cho khách dùng nước mát"
            ],
            "ans": 2,
            "explain": "Người điều hành tour phải linh hoạt bố trí lịch trình tránh thời điểm nắng gắt, đảm bảo sức khỏe và sự thoải mái cho du khách."
      }
]
  },
  {
    id: "VN-18",
    stt: 18,
    name: "Hà Tĩnh",
    mergedFrom: "Giữ nguyên (Tỉnh Hà Tĩnh)",
    regionCode: "V3",
    regionName: "Bắc Trung Bộ & Duyên hải Miền Trung",
    color: "#F05A22",
    x: 1.5,
    z: -16.2,
    polygon: [[-1.5, -18.0], [3.0, -17.5], [4.2, -14.5], [0.2, -15.0]],
    hubs: [{ name: "Hà Tĩnh", x: 2.2, z: -16.2 }],
    landmarkType: "monument",
    transport: [
      "Cao tốc Bắc - Nam (Bãi Vọt - Hàm Nghi - Vũng Áng)",
      "QL1A, QL8A (Cửa khẩu Quốc tế Cầu Treo), Cảng Vũng Áng"
    ],
    attractions: [
      {
        name: "Khu di tích Quốc gia đặc biệt Ngã ba Đồng Lộc",
        cluster: "Cụm Lịch sử Cách mạng",
        desc: "Địa chỉ đỏ tri ân 10 nữ Anh hùng Liệt sĩ Thanh niên xung phong trên tuyến đường Trường Sơn."
      },
      {
        name: "Khu lưu niệm Đại thi hào Nguyễn Du & Chùa Hương Tích",
        cluster: "Cụm Văn hóa - Tâm linh",
        desc: "Quê hương tác giả Truyện Kiều (Tiên Điền), Chùa Hương Tích ('Hoan Châu đệ nhất danh lam') trên dãy Hồng Lĩnh và Đền Ông Hoàng Mười."
      },
      {
        name: "Biển Thiên Cầm, Hồ Kẻ Gỗ & Vườn Quốc gia Vũ Quang",
        cluster: "Cụm Biển & Sinh thái",
        desc: "Bãi biển hình cánh cung đàn trời Thiên Cầm và Vườn di sản ASEAN Vũ Quang."
      }
    ],
    cuisine: ["Kẹo cu đơ Hà Tĩnh", "Mực nhảy Vũng Áng", "Gỏi cá đục", "Bưởi Phúc Trạch", "Hến xúc bánh đa Đức Thọ"],
    routeAdvice: "Thường kết hợp chặt chẽ với Nghệ An trong tour 'Về nguồn & Văn hóa Hồng Lam' (Kim Liên - Đền Ông Hoàng Mười - Nguyễn Du - Ngã ba Đồng Lộc).",
    quiz: {
      "q": "Vùng đất Hà Tĩnh là quê hương của Đại thi hào nào - danh nhân văn hóa thế giới tác giả Truyện Kiều?",
      "options": [
            "Nguyễn Trãi",
            "Nguyễn Du",
            "Cao Bá Quát",
            "Nguyễn Bỉnh Khiêm"
      ],
      "ans": 1,
      "explain": "Đại thi hào Nguyễn Du sinh ra tại làng Tiên Điền (Nghi Xuân, Hà Tĩnh), tác giả của kiệt tác bất hủ Truyện Kiều được nhân loại suy tôn."
},
    questions: [
      {
            "q": "Vùng đất Hà Tĩnh là quê hương của Đại thi hào nào - danh nhân văn hóa thế giới tác giả Truyện Kiều?",
            "options": [
                  "Nguyễn Trãi",
                  "Nguyễn Du",
                  "Cao Bá Quát",
                  "Nguyễn Bỉnh Khiêm"
            ],
            "ans": 1,
            "explain": "Đại thi hào Nguyễn Du sinh ra tại làng Tiên Điền (Nghi Xuân, Hà Tĩnh), tác giả của kiệt tác bất hủ Truyện Kiều được nhân loại suy tôn."
      },
      {
            "q": "Di tích lịch sử Quốc gia đặc biệt Ngã ba Đồng Lộc biểu trưng cho phẩm chất anh hùng nào?",
            "options": [
                  "Hoạt động giao thương buôn bán tơ lụa",
                  "Chiến thắng trên biển thời phong kiến",
                  "Sự hy sinh anh dũng kiên cường của 10 nữ liệt sĩ thanh niên xung phong giữ vững mạch máu giao thông thời chống Mỹ",
                  "Công cuộc khai hoang lập ấp"
            ],
            "ans": 2,
            "explain": "Ngã ba Đồng Lộc là địa chỉ đỏ thiêng liêng về chủ nghĩa anh hùng cách mạng và tinh thần xả thân vì độc lập tự do của Tổ quốc."
      },
      {
            "q": "Tuyến du lịch có vai trò quan trọng trong việc phát triển kinh tế địa phương vì:",
            "options": [
                  "Chỉ làm tăng chi phí quản lý",
                  "Làm giảm thu nhập của người dân",
                  "Ngăn cản các nhà đầu tư vào địa phương",
                  "Kích thích tiêu dùng, tạo việc làm, phát triển dịch vụ lưu trú, ăn uống và tiêu thụ đặc sản bản địa"
            ],
            "ans": 3,
            "explain": "Tuyến du lịch mở ra dòng khách ổn định, tạo việc làm và thúc đẩy phát triển toàn diện ngành kinh tế dịch vụ địa phương."
      }
]
  },
  {
    id: "VN-19",
    stt: 19,
    name: "Quảng Trị",
    mergedFrom: "Hợp nhất Quảng Bình + Quảng Trị",
    regionCode: "V3",
    regionName: "Bắc Trung Bộ & Duyên hải Miền Trung",
    color: "#F5C71A",
    x: 4.5,
    z: -11.5,
    polygon: [[1.2, -14.5], [4.5, -14.0], [7.5, -8.5], [4.2, -9.2]],
    hubs: [
      { name: "Đồng Hới", x: 3.8, z: -12.8 },
      { name: "Đông Hà", x: 6.0, z: -10.0 }
    ],
    landmarkType: "cave_arch",
    transport: [
      "Sân bay Đồng Hới & Sân bay Quảng Trị",
      "Cao tốc Bắc - Nam, Đường Hồ Chí Minh (nhánh Đông & Tây)",
      "Cửa khẩu Quốc tế Lao Bảo, Cha Lo"
    ],
    attractions: [
      {
        name: "Di sản Thiên nhiên Thế giới Vườn Quốc gia Phong Nha - Kẻ Bàng",
        cluster: "Cụm Vương quốc Hang động (Quảng Bình)",
        desc: "Hang Sơn Đoòng (hang động tự nhiên lớn nhất thế giới), Động Phong Nha, Động Thiên Đường, Hang Én, Suối Nước Moọc, Biển Nhật Lệ và Vũng Chùa - Đảo Yến."
      },
      {
        name: "Thành cổ Quảng Trị, Đôi bờ Hiền Lương - Bến Hải & Địa đạo Vịnh Mốc",
        cluster: "Cụm Ký ức Chiến tranh & Khát vọng Hòa bình (Quảng Trị)",
        desc: "Thành cổ 81 ngày đêm mùa hè đỏ lửa, Cầu Hiền Lương vĩ tuyến 17, Nghĩa trang Liệt sĩ Trường Sơn, Đường 9 - Khe Sanh và Đảo Cồn Cỏ."
      }
    ],
    cuisine: ["Cháo canh Quảng Bình", "Khoai deo", "Bún hến Mai Xá", "Thịt trâu lá trơng", "Cà phê Khe Sanh"],
    routeAdvice: "Sự kết hợp hoàn hảo giữa 'Kỳ quan Thiên nhiên Thế giới Phong Nha - Kẻ Bàng' và 'Di sản Ký ức Hòa bình Quảng Trị' cùng tuyến Hành lang Kinh tế Đông - Tây.",
    quiz: {
      "q": "Quần thể di tích Đôi bờ Hiền Lương - Bến Hải và Địa đạo Vịnh Mốc (Quảng Trị) mang ý nghĩa lịch sử sâu sắc nào?",
      "options": [
            "Thương cảng buôn bán đồ gốm",
            "Nơi tổ chức các giải đấu thể thao cổ đại",
            "Khát vọng hòa bình thống nhất non sông và ý chí kiên cường bám trụ đánh giặc của quân dân ta",
            "Khu nghỉ dưỡng của hoàng gia xưa"
      ],
      "ans": 2,
      "explain": "Vĩ tuyến 17 - Cầu Hiền Lương là biểu tượng cho nỗi đau chia cắt và ý chí sắt đá đấu tranh thống nhất non sông Việt Nam."
},
    questions: [
      {
            "q": "Quần thể di tích Đôi bờ Hiền Lương - Bến Hải và Địa đạo Vịnh Mốc (Quảng Trị) mang ý nghĩa lịch sử sâu sắc nào?",
            "options": [
                  "Thương cảng buôn bán đồ gốm",
                  "Nơi tổ chức các giải đấu thể thao cổ đại",
                  "Khát vọng hòa bình thống nhất non sông và ý chí kiên cường bám trụ đánh giặc của quân dân ta",
                  "Khu nghỉ dưỡng của hoàng gia xưa"
            ],
            "ans": 2,
            "explain": "Vĩ tuyến 17 - Cầu Hiền Lương là biểu tượng cho nỗi đau chia cắt và ý chí sắt đá đấu tranh thống nhất non sông Việt Nam."
      },
      {
            "q": "Vườn Quốc gia Phong Nha - Kẻ Bàng (Quảng Bình kế cận) được UNESCO vinh danh thế giới nhờ tiêu chí nào?",
            "options": [
                  "Có nhà ga máy bay ngầm",
                  "Có nhiều tòa tháp chọc trời nhất",
                  "Có bãi đỗ xe rộng nhất",
                  "Địa chất địa mạo karst cổ xưa nhất châu Á và hệ sinh thái đa dạng sinh học độc nhất vô nhị"
            ],
            "ans": 3,
            "explain": "Phong Nha - Kẻ Bàng là 'Vương quốc hang động' với Sơn Đoòng lớn nhất hành tinh cùng hệ thống hang ngầm karst kỳ vĩ."
      },
      {
            "q": "Tuyến du lịch 'Hoài niệm chiến trường xưa và Đồng đội' là sản phẩm đặc thù của vùng nào?",
            "options": [
                  "Vùng Bắc Trung Bộ (đặc biệt là Quảng Trị)",
                  "Vùng Đồng bằng sông Cửu Long",
                  "Vùng Đông Bắc",
                  "Vùng Tây Nam Bộ"
            ],
            "ans": 0,
            "explain": "Quảng Trị là tâm điểm của du lịch tâm linh tri ân với Nghĩa trang Quốc gia Trường Sơn, Đường 9, Thành cổ Quảng Trị, Địa đạo Vịnh Mốc."
      }
]
  },
  {
    id: "VN-20",
    stt: 20,
    name: "TP. Huế",
    mergedFrom: "Giữ nguyên (Thành phố trực thuộc TW Huế)",
    regionCode: "V3",
    regionName: "Bắc Trung Bộ & Duyên hải Miền Trung",
    color: "#2CE5C3",
    x: 7.8,
    z: -7.2,
    polygon: [[5.5, -8.8], [9.2, -8.0], [10.2, -6.0], [6.8, -6.5]],
    hubs: [{ name: "Huế", x: 8.0, z: -7.2 }],
    landmarkType: "imperial_gate",
    transport: [
      "Cảng Hàng không Quốc tế Phú Bài",
      "Cao tốc Cam Lộ - La Sơn - Túy Loan, Hầm Hải Vân",
      "Cảng tàu biển Chân Mây"
    ],
    attractions: [
      {
        name: "Quần thể Di tích Cố đô Huế (Di sản Văn hóa Thế giới UNESCO)",
        cluster: "Cụm Kinh thành & Lăng tẩm",
        desc: "Đại Nội Huế (Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành), Chùa Thiên Mụ và hệ thống Lăng Minh Mạng, Lăng Tự Đức, Lăng Khải Định, Lăng Gia Long."
      },
      {
        name: "Nhã nhạc Cung đình Huế, Sông Hương & Cầu Trường Tiền",
        cluster: "Cụm Di sản Phi vật thể & Đô thị",
        desc: "Thưởng thức Ca Huế trên sông Hương và trải nghiệm nghệ thuật ẩm thực Cung đình."
      },
      {
        name: "Vịnh Lăng Cô, Vườn Quốc gia Bạch Mã & Đầm phá Tam Giang",
        cluster: "Cụm Sinh thái Biển - Đầm phá",
        desc: "Vịnh Lăng Cô (một trong những vịnh biển đẹp nhất thế giới) và hệ đầm phá nước lợ Tam Giang - Cầu Hai lớn nhất Đông Nam Á."
      }
    ],
    cuisine: ["Bún bò Huế", "Cơm hến", "Bánh bèo - Nậm - Lọc", "Chè Cung đình Huế", "Mè xửng", "Tôm chua Huế"],
    routeAdvice: "Thành phố Di sản trực thuộc Trung ương đầu tiên của Việt Nam, tâm điểm của tuyến Huế - Đà Nẵng - Hội An.",
    quiz: {
      "q": "Quần thể Di tích Cố đô Huế được UNESCO vinh danh là Di sản Văn hóa Thế giới đầu tiên của Việt Nam vào năm nào?",
      "options": [
            "Năm 2010",
            "Năm 2000",
            "Năm 2005",
            "Năm 1993"
      ],
      "ans": 3,
      "explain": "Năm 1993, Quần thể Di tích Cố đô Huế chính thức trở thành Di sản Văn hóa Thế giới đầu tiên của Việt Nam được UNESCO ghi danh."
},
    questions: [
      {
            "q": "Quần thể Di tích Cố đô Huế được UNESCO vinh danh là Di sản Văn hóa Thế giới đầu tiên của Việt Nam vào năm nào?",
            "options": [
                  "Năm 2010",
                  "Năm 2000",
                  "Năm 2005",
                  "Năm 1993"
            ],
            "ans": 3,
            "explain": "Năm 1993, Quần thể Di tích Cố đô Huế chính thức trở thành Di sản Văn hóa Thế giới đầu tiên của Việt Nam được UNESCO ghi danh."
      },
      {
            "q": "Loại hình âm nhạc bác học nào của Cố đô Huế được UNESCO công nhận là Kiệt tác di sản phi vật thể truyền khẩu của nhân loại?",
            "options": [
                  "Nhã nhạc Cung đình Huế",
                  "Hát then đàn tính",
                  "Hát Xoan cửa đình",
                  "Đờn ca tài tử"
            ],
            "ans": 0,
            "explain": "Nhã nhạc Cung đình Huế là loại hình âm nhạc tao nhã, quy chuẩn của triều đình phong kiến, được vinh danh di sản thế giới năm 2003."
      },
      {
            "q": "Tuyến du lịch 'Con đường di sản miền Trung' kết nối chuỗi điểm đến nổi tiếng nào?",
            "options": [
                  "Cà Mau - Bạc Liêu - Sóc Trăng",
                  "Phong Nha - Cố đô Huế - Phố cổ Hội An - Thánh địa Mỹ Sơn",
                  "Móng Cái - Hạ Long - Hải Phòng",
                  "Hà Giang - Đồng Văn - Mèo Vạc"
            ],
            "ans": 1,
            "explain": "Con đường di sản miền Trung xâu chuỗi các di sản văn hóa và thiên nhiên thế giới UNESCO liên hoàn từ Quảng Bình, Huế đến Quảng Nam, Đà Nẵng."
      }
]
  },
  {
    id: "VN-21",
    stt: 21,
    name: "TP. Đà Nẵng",
    mergedFrom: "Hợp nhất TP. Đà Nẵng + Quảng Nam (gồm Quần đảo Hoàng Sa)",
    regionCode: "V3",
    regionName: "Duyên hải Miền Trung",
    color: "#F05A22",
    x: 9.8,
    z: -3.5,
    polygon: [[6.8, -6.0], [11.5, -5.2], [12.5, -1.0], [7.2, -1.5]],
    hubs: [
      { name: "Đà Nẵng", x: 10.5, z: -4.8 },
      { name: "Tam Kỳ", x: 11.2, z: -2.0 }
    ],
    landmarkType: "golden_bridge",
    transport: [
      "Cảng Hàng không Quốc tế Đà Nẵng & Sân bay Chu Lai",
      "Cảng biển Tiên Sa",
      "Cao tốc Đà Nẵng - Quảng Ngãi"
    ],
    attractions: [
      {
        name: "Sun World Ba Na Hills (Cầu Vàng), Bán đảo Sơn Trà & Ngũ Hành Sơn",
        cluster: "Cụm Đô thị Biển Đà Nẵng",
        desc: "Cầu Vàng biểu tượng du lịch thế giới, Cầu Rồng phun lửa, Chùa Linh Ứng Sơn Trà, Danh thắng Ngũ Hành Sơn và Biển Mỹ Khê."
      },
      {
        name: "Đô thị cổ Hội An & Khu đền tháp Mỹ Sơn (02 Di sản Thế giới UNESCO)",
        cluster: "Cụm Di sản Quảng Nam",
        desc: "Phố cổ Hội An (Chùa Cầu, đèn lồng sông Hoài), Thánh địa Mỹ Sơn của vương quốc Chămpa cổ và Khu dự trữ sinh quyển Cù Lao Chàm."
      },
      {
        name: "Rừng dừa Bảy Mẫu, Cổng trời Đông Giang & Quần đảo Hoàng Sa",
        cluster: "Cụm Sinh thái & Chủ quyền Biển đảo",
        desc: "Nhà trưng bày Hoàng Sa khẳng định chủ quyền thiêng liêng đối với Quần đảo Hoàng Sa."
      }
    ],
    cuisine: ["Mì Quảng", "Cao lầu Hội An", "Bánh tráng cuốn thịt heo", "Cơm gà Hội An", "Gỏi cá Nam Ô"],
    routeAdvice: "Việc hợp nhất Đà Nẵng và Quảng Nam tạo nên một 'Siêu đô thị Du lịch - Di sản quốc tế' thống nhất từ Bà Nà - Sơn Trà đến Hội An - Mỹ Sơn - Chu Lai.",
    quiz: {
      "q": "Thành phố Đà Nẵng giữ vị trí chiến lược nào trong phát triển du lịch của Vùng Duyên hải miền Trung?",
      "options": [
            "Là đô thị hạt nhân, trung tâm du lịch nghỉ dưỡng biển, MICE và cửa ngõ quốc tế của toàn vùng miền Trung",
            "Là vùng phụ cận không có đường hàng không",
            "Chỉ làm nhiệm vụ tiếp tế nông sản",
            "Là trung tâm khai thác quặng than"
      ],
      "ans": 0,
      "explain": "Đà Nẵng sở hữu sân bay quốc tế hiện đại, bờ biển Mỹ Khê tuyệt đẹp, Bán đảo Sơn Trà và Bà Nà Hills, là đầu tàu du lịch miền Trung."
},
    questions: [
      {
            "q": "Thành phố Đà Nẵng giữ vị trí chiến lược nào trong phát triển du lịch của Vùng Duyên hải miền Trung?",
            "options": [
                  "Là đô thị hạt nhân, trung tâm du lịch nghỉ dưỡng biển, MICE và cửa ngõ quốc tế của toàn vùng miền Trung",
                  "Là vùng phụ cận không có đường hàng không",
                  "Chỉ làm nhiệm vụ tiếp tế nông sản",
                  "Là trung tâm khai thác quặng than"
            ],
            "ans": 0,
            "explain": "Đà Nẵng sở hữu sân bay quốc tế hiện đại, bờ biển Mỹ Khê tuyệt đẹp, Bán đảo Sơn Trà và Bà Nà Hills, là đầu tàu du lịch miền Trung."
      },
      {
            "q": "Danh thắng Ngũ Hành Sơn ở Đà Nẵng gắn liền với nghệ thuật thủ công truyền thống nào?",
            "options": [
                  "Nghề làm gốm Chu Đậu",
                  "Nghề điêu khắc đá mỹ nghệ Non Nước",
                  "Nghề chạm bạc Đồng Xâm",
                  "Nghề đúc đồng Ý Yên"
            ],
            "ans": 1,
            "explain": "Làng đá mỹ nghệ Non Nước dưới chân núi Ngũ Hành Sơn có lịch sử hơn 400 năm, được công nhận là Di sản văn hóa phi vật thể quốc gia."
      },
      {
            "q": "Cầu Rồng và Cầu sông Hàn tại Đà Nẵng đóng vai trò gì trong việc tạo sức hút cho tuyến du lịch đô thị?",
            "options": [
                  "Hạn chế việc tham quan của người đi bộ",
                  "Chỉ phục vụ xe tải chở hàng",
                  "Tạo điểm nhấn kiến trúc biểu tượng về đêm, thu hút du khách xem cầu quay và rồng phun lửa/nước",
                  "Không có giá trị du lịch"
            ],
            "ans": 2,
            "explain": "Hệ thống các cây cầu độc đáo của Đà Nẵng là biểu tượng đô thị năng động, tạo ra sản phẩm du lịch ngắm cảnh đêm rực rỡ sắc màu."
      }
]
  },
  {
    id: "VN-22",
    stt: 22,
    name: "Quảng Ngãi",
    mergedFrom: "Hợp nhất Quảng Ngãi + Kon Tum (gồm Đảo Lý Sơn)",
    regionCode: "V3",
    regionName: "Nam Trung Bộ & Bắc Tây Nguyên",
    color: "#2CE5C3",
    x: 9.2,
    z: 2.0,
    polygon: [[5.2, -1.0], [13.0, -0.5], [13.5, 4.2], [5.5, 4.0]],
    hubs: [
      { name: "Quảng Ngãi", x: 11.8, z: 1.2 },
      { name: "Kon Tum", x: 7.2, z: 3.0 }
    ],
    landmarkType: "nha_rong",
    transport: [
      "Cao tốc Đà Nẵng - Quảng Ngãi",
      "Quốc lộ 24 kết nối Măng Đen - Quảng Ngãi - Cảng Sa Kỳ - Đảo Lý Sơn",
      "Ngã ba Đông Dương (Cửa khẩu Quốc tế Bờ Y)"
    ],
    attractions: [
      {
        name: "Đảo Lý Sơn (Vương quốc Tỏi & Công viên Địa chất Núi lửa Biển)",
        cluster: "Cụm Biển đảo Quảng Ngãi",
        desc: "Cổng Tò Vò, Chùa Hang, Đỉnh Thới Lới, Đảo Bé, Khu lưu niệm Đội Hoàng Sa kiêm quản Bắc Hải và Biển Mỹ Khê."
      },
      {
        name: "Khu du lịch Sinh thái Quốc gia Măng Đen & Nhà thờ Gỗ Kon Tum",
        cluster: "Cụm Đại ngàn Kon Tum",
        desc: "'Đà Lạt thứ hai' giữa rừng thông Măng Đen (Thác Pa Sỹ, Hồ Đăk Ke, Đức Mẹ Măng Đen), Nhà rông Kon Klor và Nhà thờ Gỗ trăm tuổi."
      },
      {
        name: "Cột mốc Ngã ba Đông Dương (Bờ Y) & Núi Ngọc Linh",
        cluster: "Cụm Biên giới & Dược liệu",
        desc: "Cột mốc biên giới 3 nước Việt Nam - Lào - Campuchia và thủ phủ Sâm Ngọc Linh."
      }
    ],
    cuisine: ["Tỏi cô đơn & Gỏi tỏi Lý Sơn", "Cá bống sông Trà", "Don Quảng Ngãi", "Gà nướng cơm lam Măng Đen", "Gỏi lá Kon Tum"],
    routeAdvice: "Hành trình 'Từ Đảo tiền tiêu Lý Sơn lên Rừng thông Măng Đen' chỉ trên một trục Quốc lộ 24 nội tỉnh dài hơn 100km.",
    quiz: {
      "q": "Huyện đảo Lý Sơn (Quảng Ngãi) được kiến tạo từ hiện tượng tự nhiên nào tạo nên cảnh quan kỳ thú?",
      "options": [
            "Rạn san hô ngập mặn nhân tạo",
            "Miệng núi lửa cổ phun trào hàng triệu năm trước giữa biển khơi",
            "Đầm lầy phù sa bồi lắng",
            "Công trình đào đắp hiện đại"
      ],
      "ans": 1,
      "explain": "Đảo Lý Sơn là bảo tàng tự nhiên về hoạt động của núi lửa cổ với Hang Câu, Cổng Tò Vò và vách đá Chùa Hang trầm tích triệu năm."
},
    questions: [
      {
            "q": "Huyện đảo Lý Sơn (Quảng Ngãi) được kiến tạo từ hiện tượng tự nhiên nào tạo nên cảnh quan kỳ thú?",
            "options": [
                  "Rạn san hô ngập mặn nhân tạo",
                  "Miệng núi lửa cổ phun trào hàng triệu năm trước giữa biển khơi",
                  "Đầm lầy phù sa bồi lắng",
                  "Công trình đào đắp hiện đại"
            ],
            "ans": 1,
            "explain": "Đảo Lý Sơn là bảo tàng tự nhiên về hoạt động của núi lửa cổ với Hang Câu, Cổng Tò Vò và vách đá Chùa Hang trầm tích triệu năm."
      },
      {
            "q": "Di tích lịch sử văn hóa Hải đội Hoàng Sa kiêm quản Bắc Hải trên đất Lý Sơn khẳng định điều gì?",
            "options": [
                  "Kỹ nghệ làm đồ trang sức",
                  "Tập quán săn bắt chim trời",
                  "Chứng cứ lịch sử và pháp lý thiêng liêng về chủ quyền của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa",
                  "Hoạt động xuất khẩu than đá"
            ],
            "ans": 2,
            "explain": "Hải đội Hoàng Sa từ thời chúa Nguyễn đã dong buồm ra khơi đo đạc hải trình, cắm mốc khẳng định chủ quyền thiêng liêng của Tổ quốc."
      },
      {
            "q": "Nền văn hóa khảo cổ học nổi tiếng nào thời tiền sơ sử có trung tâm phân bố tại Quảng Ngãi?",
            "options": [
                  "Văn hóa Hòa Bình",
                  "Văn hóa Đông Sơn",
                  "Văn hóa Óc Eo",
                  "Văn hóa Sa Huỳnh"
            ],
            "ans": 3,
            "explain": "Văn hóa Sa Huỳnh với táng tục mộ chum độc đáo là một trong ba đỉnh cao văn hóa kim khí trên lãnh thổ Việt Nam cổ đại."
      }
]
  },
  {
    id: "VN-25",
    stt: 25,
    name: "Khánh Hòa",
    mergedFrom: "Hợp nhất Khánh Hòa + Ninh Thuận (gồm Quần đảo Trường Sa)",
    regionCode: "V3",
    regionName: "Duyên hải Nam Trung Bộ",
    color: "#F05A22",
    x: 12.2,
    z: 16.5,
    polygon: [[10.2, 13.5], [14.2, 13.8], [13.8, 19.8], [9.8, 19.2]],
    hubs: [
      { name: "Nha Trang", x: 12.8, z: 15.2 },
      { name: "Phan Rang", x: 11.8, z: 18.5 }
    ],
    landmarkType: "cham_tower",
    transport: [
      "Cảng Hàng không Quốc tế Cam Ranh",
      "Cao tốc Bắc - Nam (Nha Trang - Cam Lâm - Vĩnh Hảo)",
      "Cảng biển Quốc tế Nha Trang & Cam Ranh"
    ],
    attractions: [
      {
        name: "Vịnh Nha Trang, VinWonders, Tháp Bà Ponagar & Vịnh Vân Phong",
        cluster: "Cụm Đô thị Biển Nha Trang (Khánh Hòa)",
        desc: "Một trong 29 vịnh đẹp nhất thế giới với Hòn Mun, Hòn Tằm, Viện Hải dương học, Tháp Bà Ponagar và Quần đảo Trường Sa."
      },
      {
        name: "Vịnh Vĩnh Hy, Vườn Quốc gia Núi Chúa (Hang Rái) & Tháp Po Klong Garai",
        cluster: "Cụm Nắng gió & Di sản Chăm (Ninh Thuận)",
        desc: "Khu dự trữ sinh quyển thế giới Núi Chúa, Vịnh Vĩnh Hy, Đồi cát Nam Cương, Vườn nho Thái An và nghệ thuật Gốm Bàu Trúc (UNESCO)."
      }
    ],
    cuisine: ["Yến sào Khánh Hòa", "Bún chả cá & Nem nướng Nha Trang", "Tôm hùm Bình Ba", "Nho & Rượu nho Phan Rang", "Thịt cừu nướng Ninh Thuận"],
    routeAdvice: "Sở hữu cung đường ven biển đẹp nhất Việt Nam (Bình Tiên - Vĩnh Hy - Cam Ranh - Nha Trang) và trung tâm hàng không quốc tế Cam Ranh.",
    quiz: {
      "q": "Vịnh Nha Trang (Khánh Hòa) được tổ chức quốc tế công nhận là thành viên của câu lạc bộ nào?",
      "options": [
            "Câu lạc bộ sa mạc cát toàn cầu",
            "Câu lạc bộ các sông băng thế giới",
            "Câu lạc bộ các vịnh biển đẹp nhất thế giới (Worldbays Club)",
            "Câu lạc bộ vùng trũng băng tuyết"
      ],
      "ans": 2,
      "explain": "Vịnh Nha Trang sở hữu hệ thống sinh thái biển đảo trù phú, rạn san hô Hòn Mun kỳ ảo và nằm trong top những vịnh biển đẹp nhất hành tinh."
},
    questions: [
      {
            "q": "Vịnh Nha Trang (Khánh Hòa) được tổ chức quốc tế công nhận là thành viên của câu lạc bộ nào?",
            "options": [
                  "Câu lạc bộ sa mạc cát toàn cầu",
                  "Câu lạc bộ các sông băng thế giới",
                  "Câu lạc bộ các vịnh biển đẹp nhất thế giới (Worldbays Club)",
                  "Câu lạc bộ vùng trũng băng tuyết"
            ],
            "ans": 2,
            "explain": "Vịnh Nha Trang sở hữu hệ thống sinh thái biển đảo trù phú, rạn san hô Hòn Mun kỳ ảo và nằm trong top những vịnh biển đẹp nhất hành tinh."
      },
      {
            "q": "Quần thể Tháp Bà Ponagar tại Nha Trang là di tích tiêu biểu của nền văn hóa tôn giáo nào?",
            "options": [
                  "Kiến trúc hoàng cung Nhật Bản",
                  "Kiến trúc Gothique châu Âu",
                  "Kiến trúc chùa tháp Phật giáo Bắc tông",
                  "Kiến trúc đền tháp và tín ngưỡng nữ thần Mẹ Xứ Sở (Thiên Y A Na) của người Chăm"
            ],
            "ans": 3,
            "explain": "Tháp Bà Ponagar được xây dựng từ thế kỷ 8 đến 13 bằng gạch nung độc đáo, là biểu tượng giao lưu văn hóa Chăm - Việt rực rỡ."
      },
      {
            "q": "Khí hậu vùng Duyên hải Nam Trung Bộ thuận lợi nhất cho loại hình du lịch nào quanh năm?",
            "options": [
                  "Du lịch nghỉ dưỡng biển, lặn ngắm san hô, tắm bùn khoáng nóng và thể thao biển",
                  "Du lịch trượt tuyết mùa đông",
                  "Du lịch leo núi băng",
                  "Du lịch săn mây tuyết lạnh"
            ],
            "ans": 0,
            "explain": "Thời tiết nhiều nắng, biển xanh êm sóng và khí hậu ôn hòa giúp Khánh Hòa đón khách du lịch nghỉ dưỡng biển suốt 12 tháng trong năm."
      }
]
  },

  // ================= VÙNG 4: TÂY NGUYÊN - NAM TRUNG BỘ MỞ RỘNG (3) =================
  {
    id: "VN-23",
    stt: 23,
    name: "Gia Lai",
    mergedFrom: "Hợp nhất Gia Lai + Bình Định",
    regionCode: "V4",
    regionName: "Tây Nguyên - Duyên hải Nam Trung Bộ",
    color: "#0047BA",
    x: 9.2,
    z: 6.8,
    polygon: [[4.8, 4.0], [13.8, 4.2], [14.2, 9.2], [5.0, 9.0]],
    hubs: [
      { name: "Pleiku", x: 6.8, z: 6.5 },
      { name: "Quy Nhơn", x: 12.8, z: 7.2 }
    ],
    landmarkType: "cham_tower",
    transport: [
      "Sân bay Phù Cát (Quy Nhơn) & Sân bay Pleiku",
      "Quốc lộ 19 & Cao tốc Quy Nhơn - Pleiku, Cửa khẩu Quốc tế Lệ Thanh"
    ],
    attractions: [
      {
        name: "Kỳ Co - Eo Gió, Ghềnh Ráng Tiên Sa & Hệ thống Tháp Chăm Bình Định",
        cluster: "Cụm Đất Võ & Biển Quy Nhơn (Bình Định)",
        desc: "Thiên đường biển đảo Kỳ Co - Eo Gió, Hòn Khô, Bảo tàng Quang Trung (Tây Sơn) và Tháp Đôi, Tháp Bánh Ít."
      },
      {
        name: "Biển Hồ (Hồ T'Nưng), Núi lửa Chư Đăng Ya & Chùa Minh Thành",
        cluster: "Cụm Cao nguyên Pleiku (Gia Lai)",
        desc: "'Đôi mắt Pleiku' Biển Hồ, mùa hoa dã quỳ trên miệng núi lửa Chư Đăng Ya, Thủy điện Yaly và Vườn quốc gia Kon Ka Kinh."
      }
    ],
    cuisine: ["Phở khô Gia Lai (Phở 2 tô)", "Bánh hỏi lòng heo Quy Nhơn", "Rượu Bầu Đá", "Chả ram tôm đất", "Gà nướng cơm lam Pleiku"],
    routeAdvice: "Trục Đông - Tây dọc Quốc lộ 19 cho phép du khách tắm biển Kỳ Co (Quy Nhơn) buổi sáng và thưởng thức cà phê bên Biển Hồ (Pleiku) buổi chiều.",
    quiz: {
      "q": "Thắng cảnh Biển Hồ T'nưng (Gia Lai) được mệnh danh là 'Đôi mắt Pleiku' có nguồn gốc hình thành từ đâu?",
      "options": [
            "Hào nước phòng thủ thời phong kiến",
            "Đập ngăn nước thủy điện nhân tạo",
            "Hồ nước mặn từ biển dâng",
            "Miệng một ngọn núi lửa khổng lồ đã ngừng hoạt động hàng triệu năm trước"
      ],
      "ans": 3,
      "explain": "Biển Hồ Pleiku là hồ nước ngọt tự nhiên nằm trên miệng núi lửa bazan cổ, bao quanh bởi rừng thông bạt ngàn tuyệt đẹp."
},
    questions: [
      {
            "q": "Thắng cảnh Biển Hồ T'nưng (Gia Lai) được mệnh danh là 'Đôi mắt Pleiku' có nguồn gốc hình thành từ đâu?",
            "options": [
                  "Hào nước phòng thủ thời phong kiến",
                  "Đập ngăn nước thủy điện nhân tạo",
                  "Hồ nước mặn từ biển dâng",
                  "Miệng một ngọn núi lửa khổng lồ đã ngừng hoạt động hàng triệu năm trước"
            ],
            "ans": 3,
            "explain": "Biển Hồ Pleiku là hồ nước ngọt tự nhiên nằm trên miệng núi lửa bazan cổ, bao quanh bởi rừng thông bạt ngàn tuyệt đẹp."
      },
      {
            "q": "Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO vinh danh là:",
            "options": [
                  "Kiệt tác di sản văn hóa phi vật thể và truyền khẩu của nhân loại",
                  "Di sản ký ức tư liệu",
                  "Di tích khảo cổ học đồ đá",
                  "Di sản địa chất thế giới"
            ],
            "ans": 0,
            "explain": "Không gian văn hóa Cồng chiêng trải rộng khắp 5 tỉnh Tây Nguyên, gắn bó mật thiết với vòng đời người và lễ hội mùa màng của đồng bào các dân tộc."
      },
      {
            "q": "Tuyến du lịch 'Con đường xanh Tây Nguyên' có vai trò quan trọng gì trong phát triển kinh tế vùng?",
            "options": [
                  "Chỉ để vận chuyển khoáng sản bauxite",
                  "Liên kết các tỉnh cao nguyên, quảng bá văn hóa bản địa, cà phê và thu hút khách du lịch sinh thái rừng núi",
                  "Làm giảm diện tích rừng phòng hộ",
                  "Thay thế hoàn toàn giao thông đường bộ"
            ],
            "ans": 1,
            "explain": "Tuyến du lịch này giúp kết nối các trọng điểm văn hóa cao nguyên, bảo tồn nếp nhà rông và nâng cao đời sống bà con buôn làng."
      }
]
  },
  {
    id: "VN-24",
    stt: 24,
    name: "Đắk Lắk",
    mergedFrom: "Hợp nhất Đắk Lắk + Phú Yên",
    regionCode: "V4",
    regionName: "Tây Nguyên - Duyên hải Nam Trung Bộ",
    color: "#2CE5C3",
    x: 9.0,
    z: 11.5,
    polygon: [[4.8, 9.0], [14.2, 9.2], [14.5, 13.8], [5.2, 13.5]],
    hubs: [
      { name: "Buôn Ma Thuột", x: 7.0, z: 12.0 },
      { name: "Tuy Hòa", x: 13.2, z: 11.2 }
    ],
    landmarkType: "coffee_ganhdadia",
    transport: [
      "Sân bay Buôn Ma Thuột & Sân bay Tuy Hòa",
      "Cao tốc Khánh Hòa - Buôn Ma Thuột, Quốc lộ 29 kết nối Rừng - Biển"
    ],
    attractions: [
      {
        name: "Bảo tàng Thế giới Cà phê, Khu du lịch Buôn Đôn, Hồ Lắk & Thác Dray Nur",
        cluster: "Cụm Thủ phủ Cà phê (Đắk Lắk)",
        desc: "Không gian văn hóa Cồng chiêng Tây Nguyên (UNESCO), Vườn quốc gia Yok Đôn và kiến trúc nhà dài Ê-đê."
      },
      {
        name: "Danh thắng Quốc gia đặc biệt Gành Đá Đĩa, Mũi Điện & Tháp Nghinh Phong",
        cluster: "Cụm Xứ sở Hoa vàng cỏ xanh (Phú Yên)",
        desc: "Kiệt tác đá bazan hình lăng trụ Gành Đá Đĩa, Mũi Điện (nơi đón ánh bình minh sớm trên đất liền), Vịnh Vũng Rô và Đầm Ô Loan."
      }
    ],
    cuisine: ["Cà phê Buôn Ma Thuột", "Gà nướng & Cơm lam Bản Đôn", "Mắt cá ngừ đại dương Phú Yên", "Sò huyết Đầm Ô Loan", "Bơ sáp Đắk Lắk"],
    routeAdvice: "Sự giao thoa độc đáo giữa 'Thủ phủ Cà phê & Đại ngàn Tây Nguyên (Buôn Ma Thuột)' và 'Bờ biển Di sản Địa chất Gành Đá Đĩa (Tuy Hòa)'.",
    quiz: {
      "q": "Thành phố Buôn Ma Thuột (Đắk Lắk) được định hướng xây dựng thành đô thị mang thương hiệu quốc tế nào?",
      "options": [
            "Thành phố Cà phê của thế giới",
            "Thủ phủ xuất khẩu than đá",
            "Trung tâm đóng tàu quân sự",
            "Đô thị du lịch tuyết trắng"
      ],
      "ans": 0,
      "explain": "Buôn Ma Thuột là thủ phủ cà phê của Việt Nam, nơi có Lễ hội Cà phê Quốc gia và Bảo tàng Thế giới Cà phê thu hút du khách toàn cầu."
},
    questions: [
      {
            "q": "Thành phố Buôn Ma Thuột (Đắk Lắk) được định hướng xây dựng thành đô thị mang thương hiệu quốc tế nào?",
            "options": [
                  "Thành phố Cà phê của thế giới",
                  "Thủ phủ xuất khẩu than đá",
                  "Trung tâm đóng tàu quân sự",
                  "Đô thị du lịch tuyết trắng"
            ],
            "ans": 0,
            "explain": "Buôn Ma Thuột là thủ phủ cà phê của Việt Nam, nơi có Lễ hội Cà phê Quốc gia và Bảo tàng Thế giới Cà phê thu hút du khách toàn cầu."
      },
      {
            "q": "Hồ Lắk tại Đắk Lắk giữ kỷ lục nào về tài nguyên du lịch mặt nước ngọt tại Tây Nguyên?",
            "options": [
                  "Là hồ nước mặn nhân tạo",
                  "Là hồ nước ngọt tự nhiên lớn nhất Tây Nguyên và lớn thứ hai ở Việt Nam (sau hồ Ba Bể)",
                  "Là hồ chứa nước hóa chất",
                  "Là dòng sông ngầm ngập mặn"
            ],
            "ans": 1,
            "explain": "Hồ Lắk thơ mộng nép mình bên dãy Chư Yang Sin hùng vĩ cùng buôn Jun của người M'Nông lưu giữ nếp nhà dài truyền thống."
      },
      {
            "q": "Khi tổ chức tour du lịch sinh thái cưỡi voi hoặc trải nghiệm thân thiện với voi tại Buôn Đôn, xu hướng nghiệp vụ hiện đại chuyển đổi sang mô hình nào?",
            "options": [
                  "Bán ngà voi làm đồ lưu niệm",
                  "Tăng cường khai thác cưỡi voi quá tải",
                  "Chuyển đổi hoàn toàn sang mô hình du lịch thân thiện với voi (ngắm voi tự nhiên, tắm cùng voi, bảo tồn sinh cảnh)",
                  "Nhốt voi trong lồng sắt hẹp"
            ],
            "ans": 2,
            "explain": "Ngành du lịch Đắk Lắk tiên phong chuyển sang mô hình du lịch thân thiện với voi nhằm bảo tồn đàn voi nhà và bảo vệ quyền động vật."
      }
]
  },
  {
    id: "VN-26",
    stt: 26,
    name: "Lâm Đồng",
    mergedFrom: "Hợp nhất Lâm Đồng + Đắk Nông + Bình Thuận (gồm Đảo Phú Quý)",
    regionCode: "V4",
    regionName: "Tây Nguyên - Duyên hải Nam Trung Bộ",
    color: "#F5C71A",
    x: 8.2,
    z: 18.2,
    polygon: [[5.2, 13.8], [10.5, 14.5], [11.5, 22.2], [6.2, 21.5]],
    hubs: [
      { name: "Gia Nghĩa", x: 6.5, z: 15.5 },
      { name: "Đà Lạt", x: 9.0, z: 17.2 },
      { name: "Phan Thiết", x: 8.8, z: 21.0 }
    ],
    landmarkType: "dalat_flower",
    transport: [
      "Sân bay Quốc tế Liên Khương & Sân bay Phan Thiết",
      "Cao tốc Dầu Giây - Vĩnh Hảo - Phan Thiết, Cao tốc Tân Phú - Bảo Lộc - Liên Khương"
    ],
    attractions: [
      {
        name: "TP. Ngàn hoa Đà Lạt (Hồ Xuân Hương, Langbiang, Quảng trường Lâm Viên)",
        cluster: "Cụm Cao nguyên Lâm Viên (Lâm Đồng)",
        desc: "Thành phố sáng tạo Âm nhạc của UNESCO với Thiền viện Trúc Lâm, Hồ Tuyền Lâm, Đồi chè Cầu Đất và Khu dự trữ sinh quyển Langbiang."
      },
      {
        name: "Công viên Địa chất Toàn cầu UNESCO Đắk Nông & Hồ Tà Đùng",
        cluster: "Cụm Địa chất Núi lửa (Đắk Nông)",
        desc: "Hệ thống hang động núi lửa Chư Bluk dài nhất Đông Nam Á và Hồ Tà Đùng được ví như 'Vịnh Hạ Long trên Tây Nguyên'."
      },
      {
        name: "Khu du lịch Quốc gia Mũi Né (Bàu Trắng, Đồi Cát Bay) & Đảo Phú Quý",
        cluster: "Cụm Biển & Tiểu sa mạc (Bình Thuận)",
        desc: "Thủ phủ resort biển Mũi Né, Hải đăng Kê Gà và hòn đảo Phú Quý hoang sơ giữa biển khơi."
      }
    ],
    cuisine: ["Lẩu gà lá é & Bánh căn Đà Lạt", "Dâu tây, Atiso & Rượu vang Đà Lạt", "Bơ sáp Đắk Nông", "Lẩu thả Mũi Né", "Cua Huỳnh Đế Phú Quý"],
    routeAdvice: "Tỉnh có diện tích lớn nhất và hệ sinh thái du lịch hoàn chỉnh bậc nhất cả nước: Tam giác vàng Đà Lạt (Núi hoa) - Gia Nghĩa (Hồ Tà Đùng) - Phan Thiết (Biển Mũi Né & Đảo Phú Quý).",
    quiz: {
      "q": "Thành phố Đà Lạt (Lâm Đồng) được thiên nhiên ưu đãi khí hậu đặc trưng nào biến nơi đây thành thiên đường nghỉ dưỡng?",
      "options": [
            "Khí hậu sa mạc nóng khô bỏng rát",
            "Khí hậu ôn đới cao nguyên mát mẻ quanh năm, nhiệt độ trung bình 18-21°C với sương mù và bốn mùa hoa nở",
            "Khí hậu ngập lụt nhiệt đới",
            "Khí hậu vùng cực băng giá"
      ],
      "ans": 1,
      "explain": "Nằm ở độ cao 1.500m trên cao nguyên Lang Biang, Đà Lạt có vi khí hậu mát mẻ quanh năm, rừng thông reo và ngàn hoa khoe sắc."
},
    questions: [
      {
            "q": "Thành phố Đà Lạt (Lâm Đồng) được thiên nhiên ưu đãi khí hậu đặc trưng nào biến nơi đây thành thiên đường nghỉ dưỡng?",
            "options": [
                  "Khí hậu sa mạc nóng khô bỏng rát",
                  "Khí hậu ôn đới cao nguyên mát mẻ quanh năm, nhiệt độ trung bình 18-21°C với sương mù và bốn mùa hoa nở",
                  "Khí hậu ngập lụt nhiệt đới",
                  "Khí hậu vùng cực băng giá"
            ],
            "ans": 1,
            "explain": "Nằm ở độ cao 1.500m trên cao nguyên Lang Biang, Đà Lạt có vi khí hậu mát mẻ quanh năm, rừng thông reo và ngàn hoa khoe sắc."
      },
      {
            "q": "Di sản tư liệu thế giới nào của Việt Nam được lưu giữ tại Trung tâm Lưu trữ Quốc gia IV ở Đà Lạt?",
            "options": [
                  "Bia đá tiến sĩ Văn Miếu",
                  "Mộc bản chùa Vĩnh Nghiêm",
                  "Mộc bản triều Nguyễn",
                  "Châu bản triều Nguyễn"
            ],
            "ans": 2,
            "explain": "Khối Mộc bản triều Nguyễn gồm 34.618 tấm khắc chữ Hán - Nôm ngược là Di sản Tư liệu Thế giới đầu tiên của Việt Nam được UNESCO ghi danh."
      },
      {
            "q": "Việc kết hợp tuyến du lịch 'Hoa & Biển' giữa Đà Lạt và Nha Trang qua đèo Khánh Lê là ví dụ điển hình của:",
            "options": [
                  "Tuyến giao thông khép kín không mở cửa",
                  "Tuyến du lịch đơn điệu không có điểm nhấn",
                  "Tuyến đường chỉ dành cho tàu chở dầu",
                  "Tuyến du lịch liên kết hai vùng sinh thái (rừng núi cao nguyên mát mẻ kết hợp biển đảo ngập tràn nắng ấm)"
            ],
            "ans": 3,
            "explain": "Cung đường hoa và biển kết nối trong cùng một hành trình giúp du khách vừa thưởng ngoạn rừng thông đại ngàn vừa đắm mình trong làn nước biển trong xanh."
      }
]
  },

  // ================= VÙNG 5: ĐÔNG NAM BỘ (3) =================
  {
    id: "VN-27",
    stt: 27,
    name: "Đồng Nai",
    mergedFrom: "Hợp nhất Đồng Nai + Bình Phước",
    regionCode: "V5",
    regionName: "Đông Nam Bộ",
    color: "#10B981",
    x: 4.5,
    z: 18.8,
    polygon: [[2.5, 14.5], [6.0, 15.0], [6.2, 22.2], [3.0, 21.5]],
    hubs: [
      { name: "Đồng Xoài", x: 4.2, z: 16.5 },
      { name: "Biên Hòa", x: 4.5, z: 20.8 }
    ],
    landmarkType: "tea_hills",
    transport: [
      "Siêu Cảng Hàng không Quốc tế Long Thành",
      "Cao tốc TP.HCM - Long Thành - Dầu Giây, Cửa khẩu Quốc tế Hoa Lư"
    ],
    attractions: [
      {
        name: "Khu dự trữ sinh quyển thế giới Vườn Quốc gia Cát Tiên & Hồ Trị An",
        cluster: "Cụm Sinh thái Đồng Nai",
        desc: "Rừng nguyên sinh nhiệt đới Cát Tiên, Khu du lịch Bửu Long, Núi Chứa Chan và cắm trại ven Hồ Trị An."
      },
      {
        name: "Vườn Quốc gia Bù Gia Mập, Núi Bà Rá - Thác Mơ & Sóc Bom Bo",
        cluster: "Cụm Lịch sử & Văn hóa S'tiêng (Bình Phước)",
        desc: "Di tích Quốc gia đặc biệt Căn cứ Bộ chỉ huy Quân giải phóng miền Nam Việt Nam (Tà Thiết) và Trảng cỏ Bù Lạch."
      }
    ],
    cuisine: ["Bưởi đường lá cam Tân Triều (Gà hấp bưởi)", "Cá lăng Hồ Trị An", "Hạt điều Bình Phước", "Đọt mây nướng & Cơm lam Sóc Bom Bo"],
    routeAdvice: "Cửa ngõ hàng không quốc tế mới của phía Nam (Sân bay Long Thành) kết hợp du lịch sinh thái rừng cuối tuần (Cát Tiên - Bù Gia Mập).",
    quiz: {
      "q": "Vườn Quốc gia Cát Tiên (Đồng Nai) được UNESCO công nhận là danh hiệu gì về bảo tồn thiên nhiên?",
      "options": [
            "Khu công nghiệp cơ khí",
            "Khu di tích khảo cổ thời đồ đá",
            "Khu Dự trữ Sinh quyển Thế giới và Khu Ramsar quốc tế Bàu Sấu",
            "Trung tâm thể thao thành tích cao"
      ],
      "ans": 2,
      "explain": "Vườn Quốc gia Cát Tiên là một trong những khu bảo tồn thiên nhiên đa dạng sinh học nhiệt đới đất thấp lớn và quý giá nhất của Việt Nam."
},
    questions: [
      {
            "q": "Vườn Quốc gia Cát Tiên (Đồng Nai) được UNESCO công nhận là danh hiệu gì về bảo tồn thiên nhiên?",
            "options": [
                  "Khu công nghiệp cơ khí",
                  "Khu di tích khảo cổ thời đồ đá",
                  "Khu Dự trữ Sinh quyển Thế giới và Khu Ramsar quốc tế Bàu Sấu",
                  "Trung tâm thể thao thành tích cao"
            ],
            "ans": 2,
            "explain": "Vườn Quốc gia Cát Tiên là một trong những khu bảo tồn thiên nhiên đa dạng sinh học nhiệt đới đất thấp lớn và quý giá nhất của Việt Nam."
      },
      {
            "q": "Khu du lịch Suối Mơ và làng bưởi Tân Triều tại Đồng Nai là minh chứng cho loại hình du lịch nào?",
            "options": [
                  "Du lịch băng tuyết nhân tạo",
                  "Du lịch sòng bạc xuyên biên giới",
                  "Du lịch công nghiệp vũ trụ",
                  "Du lịch sinh thái nghỉ dưỡng miệt vườn gắn với sản vật ẩm thực sông nước Đồng Nai"
            ],
            "ans": 3,
            "explain": "Bưởi Tân Triều nức tiếng kết hợp nguồn nước khoáng tự nhiên Suối Mơ tạo ra sản phẩm du lịch sinh thái cuối tuần hấp dẫn vùng Đông Nam Bộ."
      },
      {
            "q": "Phương tiện vận chuyển trên tuyến du lịch Đông Nam Bộ kết nối sân bay quốc tế Long Thành trong tương lai đòi hỏi:",
            "options": [
                  "Hạ tầng cao tốc hiện đại, liên thông đa phương thức (đường bộ cao tốc, đường sắt nhẹ đô thị, hàng không)",
                  "Chỉ sử dụng xe lam ba bánh",
                  "Không cần kết nối đường bộ",
                  "Cấm các loại xe buýt du lịch"
            ],
            "ans": 0,
            "explain": "Hành lang giao thông cao tốc kết nối sân bay Long Thành là đòn bẩy chiến lược đưa khách du lịch quốc tế tỏa đi khắp các vùng cả nước."
      }
]
  },
  {
    id: "VN-28",
    stt: 28,
    name: "Tây Ninh",
    mergedFrom: "Hợp nhất Tây Ninh + Long An",
    regionCode: "V5",
    regionName: "Đông Nam Bộ & Cửa ngõ ĐBSCL",
    color: "#F5C71A",
    x: 0.8,
    z: 20.8,
    polygon: [[-1.0, 17.2], [2.5, 17.5], [2.6, 23.8], [-1.2, 23.2]],
    hubs: [
      { name: "Tây Ninh", x: 0.8, z: 18.8 },
      { name: "Tân An", x: 1.2, z: 22.8 }
    ],
    landmarkType: "mountain_peak",
    transport: [
      "Cao tốc TP.HCM - Mộc Bài, Cao tốc TP.HCM - Trung Lương",
      "Cửa khẩu Quốc tế Mộc Bài, Xa Mát, Cảng Quốc tế Long An"
    ],
    attractions: [
      {
        name: "Khu du lịch Quốc gia Núi Bà Đen & Tòa Thánh Cao Đài Tây Ninh",
        cluster: "Cụm Tâm linh & Nóc nhà Nam Bộ (Tây Ninh)",
        desc: "Đỉnh Núi Bà Đen cao 986m với Tượng Phật Bà Tây Bổ Đà Sơn bằng đồng cao nhất châu Á trên đỉnh núi, Hồ Dầu Tiếng và Trung ương Cục miền Nam."
      },
      {
        name: "Làng nổi Tân Lập & Khu du lịch Cánh đồng bất tận",
        cluster: "Cụm Sinh thái Đồng Tháp Mười (Long An)",
        desc: "Cung đường xuyên rừng tràm ngập nước Làng nổi Tân Lập và hệ sinh thái đất ngập nước vùng Đồng Tháp Mười."
      }
    ],
    cuisine: ["Bánh tráng phơi sương Trảng Bàng", "Muối tôm Tây Ninh", "Bò tơ Tây Ninh", "Lẩu mắm & Cá lóc nướng trui Long An", "Thanh long Châu Thành"],
    routeAdvice: "Hành lang du lịch biên giới và sinh thái phía Tây TP.HCM: Từ đỉnh Núi Bà Đen hùng vĩ xuống miền sông nước Vàm Cỏ - Làng nổi Tân Lập.",
    quiz: {
      "q": "Quần thể Di tích Lịch sử và Danh lam Thắng cảnh Núi Bà Đen (Tây Ninh) được mệnh danh là:",
      "options": [
            "Núi đá vôi karst cổ",
            "Đỉnh núi cao nhất bán đảo Đông Dương",
            "Núi lửa đang hoạt động",
            "Nóc nhà Đông Nam Bộ - Đệ nhất thiên sơn với tượng Phật Bà Tây Bổ Đà Sơn kỷ lục châu Á"
      ],
      "ans": 3,
      "explain": "Với độ cao 986m, Núi Bà Đen là đỉnh núi cao nhất miền Nam, điểm đến du lịch tâm linh và săn mây ngoạn mục bậc nhất."
},
    questions: [
      {
            "q": "Quần thể Di tích Lịch sử và Danh lam Thắng cảnh Núi Bà Đen (Tây Ninh) được mệnh danh là:",
            "options": [
                  "Núi đá vôi karst cổ",
                  "Đỉnh núi cao nhất bán đảo Đông Dương",
                  "Núi lửa đang hoạt động",
                  "Nóc nhà Đông Nam Bộ - Đệ nhất thiên sơn với tượng Phật Bà Tây Bổ Đà Sơn kỷ lục châu Á"
            ],
            "ans": 3,
            "explain": "Với độ cao 986m, Núi Bà Đen là đỉnh núi cao nhất miền Nam, điểm đến du lịch tâm linh và săn mây ngoạn mục bậc nhất."
      },
      {
            "q": "Tòa Thánh Tây Ninh là thánh địa trung ương của tôn giáo bản địa thuần Việt nào?",
            "options": [
                  "Đạo Cao Đài (Đại Đạo Tam Kỳ Phổ Độ)",
                  "Đạo Bà La Môn",
                  "Đạo Hồi",
                  "Đạo Do Thái"
            ],
            "ans": 0,
            "explain": "Tòa Thánh Tây Ninh với kiến trúc kết hợp hài hòa triết lý Đông - Tây và biểu tượng Thiên Nhãn là điểm du lịch tôn giáo độc đáo thu hút khách quốc tế."
      },
      {
            "q": "Đặc sản ẩm thực nào của Tây Ninh đã được công nhận là Di sản văn hóa phi vật thể quốc gia?",
            "options": [
                  "Phở bò Nam Định",
                  "Nghệ thuật chế biến món ăn chay và Nghề làm bánh tráng phơi sương Trảng Bàng",
                  "Bún chả Hà Nội",
                  "Bánh cống Sóc Trăng"
            ],
            "ans": 1,
            "explain": "Bánh tráng phơi sương Trảng Bàng cùng văn hóa ẩm thực chay phong phú là niềm tự hào văn hóa ẩm thực độc đáo của vùng đất Tây Ninh."
      }
]
  },
  {
    id: "VN-29",
    stt: 29,
    name: "TP. Hồ Chí Minh",
    mergedFrom: "Hợp nhất TP.HCM + Bình Dương + Bà Rịa - Vũng Tàu (gồm Đảo Côn Sơn)",
    regionCode: "V5",
    regionName: "Đông Nam Bộ (Siêu Đô thị)",
    color: "#0047BA",
    x: 3.8,
    z: 23.0,
    polygon: [[2.2, 19.2], [4.2, 19.5], [6.8, 23.2], [4.8, 24.8], [2.5, 23.5]],
    hubs: [
      { name: "Thủ Dầu Một", x: 2.8, z: 20.2 },
      { name: "TP. Hồ Chí Minh", x: 3.0, z: 22.2 },
      { name: "Bà Rịa", x: 5.5, z: 23.8 }
    ],
    landmarkType: "skyscraper",
    transport: [
      "Cảng Hàng không Quốc tế Tân Sơn Nhất & Sân bay Côn Đảo",
      "Tuyến Metro số 1, Cảng biển Quốc tế Cái Mép - Thị Vải, Tàu cao tốc Bạch Đằng - Vũng Tàu - Côn Đảo"
    ],
    attractions: [
      {
        name: "Dinh Độc Lập, Chợ Bến Thành, Bến Nhà Rồng & Địa đạo Củ Chi",
        cluster: "Cụm Đô thị Sài Gòn - TP.HCM",
        desc: "Trung tâm kinh tế - văn hóa sôi động nhất cả nước, Phố đi bộ Nguyễn Huệ, Bảo tàng Chứng tích Chiến tranh và Khu dự trữ sinh quyển rừng ngập mặn Cần Giờ."
      },
      {
        name: "Biển Vũng Tàu, Hồ Tràm - Bình Châu & Đặc khu Du lịch Côn Đảo",
        cluster: "Cụm Nghỉ dưỡng Biển & Đảo (Bà Rịa - Vũng Tàu)",
        desc: "Bãi Sau Vũng Tàu, Tượng Chúa Kitô Vua, suối khoáng nóng Bình Châu và Khu di tích lịch sử Quốc gia đặc biệt - Vườn quốc gia Côn Đảo."
      },
      {
        name: "Khu du lịch Đại Nam & Làng nghề Gốm sứ - Sơn mài",
        cluster: "Cụm Văn hóa Bình Dương",
        desc: "Chùa Bà Thiên Hậu, Làng sơn mài Tương Bình Hiệp và vườn trái cây Lái Thiêu."
      }
    ],
    cuisine: ["Cơm tấm Sài Gòn", "Bánh mì & Hủ tiếu Nam Vang", "Bánh khọt Vũng Tàu", "Gỏi gà măng cụt Lái Thiêu", "Hạt bàng Côn Đảo"],
    routeAdvice: "Siêu đô thị biển - công nghiệp - dịch vụ tầm cỡ khu vực châu Á, kết nối hoàn hảo du lịch MICE nội đô với nghỉ dưỡng biển Hồ Tràm - Vũng Tàu - Côn Đảo.",
    quiz: {
      "q": "Thành phố Hồ Chí Minh giữ vai trò nào trong ngành du lịch Việt Nam?",
      "options": [
            "Là trung tâm du lịch lớn nhất cả nước, cửa ngõ đón khách quốc tế đường hàng không và đầu tàu phát triển du lịch MICE",
            "Là điểm du lịch nông thôn đơn lẻ",
            "Chỉ đón khách bằng đường sắt",
            "Không có di tích lịch sử nào"
      ],
      "ans": 0,
      "explain": "TP. Hồ Chí Minh đóng góp tỷ trọng doanh thu du lịch hàng đầu cả nước, hội tụ hạ tầng hiện đại, ẩm thực đỉnh cao và dòng khách quốc tế lớn nhất."
},
    questions: [
      {
            "q": "Thành phố Hồ Chí Minh giữ vai trò nào trong ngành du lịch Việt Nam?",
            "options": [
                  "Là trung tâm du lịch lớn nhất cả nước, cửa ngõ đón khách quốc tế đường hàng không và đầu tàu phát triển du lịch MICE",
                  "Là điểm du lịch nông thôn đơn lẻ",
                  "Chỉ đón khách bằng đường sắt",
                  "Không có di tích lịch sử nào"
            ],
            "ans": 0,
            "explain": "TP. Hồ Chí Minh đóng góp tỷ trọng doanh thu du lịch hàng đầu cả nước, hội tụ hạ tầng hiện đại, ẩm thực đỉnh cao và dòng khách quốc tế lớn nhất."
      },
      {
            "q": "Khu Di tích Lịch sử Địa đạo Củ Chi được nhân loại ngưỡng mộ nhờ giá trị nào?",
            "options": [
                  "Hệ thống đường ngầm chở vàng bạc",
                  "Hệ thống công sự ngầm trong lòng đất dài hơn 250 km thể hiện ý chí quật cường và nghệ thuật quân sự độc đáo",
                  "Hệ thống hầm mỏ khai thác than",
                  "Công trình tàu điện ngầm hiện đại"
            ],
            "ans": 1,
            "explain": "Địa đạo Củ Chi - 'Thành phố trong lòng đất' là kỳ tích đánh giặc giữ nước của quân dân miền Nam được du khách khắp thế giới tôn vinh."
      },
      {
            "q": "Rừng ngập mặn Cần Giờ tại TP. Hồ Chí Minh tự hào với danh hiệu quốc tế nào?",
            "options": [
                  "Vườn quốc gia băng giá",
                  "Công viên địa chất sa mạc",
                  "Khu Dự trữ Sinh quyển Thế giới đầu tiên tại Việt Nam được UNESCO công nhận (năm 2000)",
                  "Di sản tư liệu mộc bản"
            ],
            "ans": 2,
            "explain": "Được ví như 'Lá phổi xanh' của thành phố, Cần Giờ là khu rừng ngập mặn phục hồi sinh thái ngoạn mục và là khu dự trữ sinh quyển thế giới đầu tiên của nước ta."
      }
]
  },

  // ================= VÙNG 6: ĐỒNG BẰNG SÔNG CỬU LONG (5) =================
  {
    id: "VN-30",
    stt: 30,
    name: "Đồng Tháp",
    mergedFrom: "Hợp nhất Đồng Tháp + Tiền Giang",
    regionCode: "V6",
    regionName: "Đồng bằng sông Cửu Long",
    color: "#F05A22",
    x: -0.5,
    z: 24.5,
    polygon: [[-3.2, 22.8], [2.5, 23.5], [2.8, 25.5], [-2.5, 25.2]],
    hubs: [
      { name: "Cao Lãnh", x: -1.5, z: 24.0 },
      { name: "Mỹ Tho", x: 1.5, z: 24.8 }
    ],
    landmarkType: "lotus_house",
    transport: [
      "Cao tốc TP.HCM - Trung Lương - Mỹ Thuận - Cao Lãnh",
      "Hành lang du lịch đường thủy Sông Tiền"
    ],
    attractions: [
      {
        name: "Vườn Quốc gia Tràm Chim, Làng hoa Sa Đéc & Khu di tích Xẻo Quýt",
        cluster: "Cụm Đất Sen Hồng (Đồng Tháp)",
        desc: "Khu Ramsar thế giới Tràm Chim (nơi cư trú của Sếu đầu đỏ), Nhà cổ Huỳnh Thủy Lê, Khu di tích Cụ Phó bảng Nguyễn Sinh Sắc và Gò Tháp."
      },
      {
        name: "Cù lao Thới Sơn (Tứ linh), Chùa Vĩnh Tràng & Làng cổ Đông Hòa Hiệp",
        cluster: "Cụm Miệt vườn Sông Tiền (Tiền Giang)",
        desc: "Đi xuồng ba lá dưới rạch dừa nước, thưởng thức trái cây miệt vườn, nghe Đờn ca tài tử và thăm Trại rắn Đồng Tâm."
      }
    ],
    cuisine: ["Hủ tiếu Mỹ Tho & Hủ tiếu Sa Đéc", "Ẩm thực từ Sen Đồng Tháp", "Nem Lai Vung", "Vú sữa Lò Rèn", "Xoài cát Hòa Lộc"],
    routeAdvice: "Trục du lịch đường sông Tiền xuyên suốt từ Mỹ Tho - Cái Bè (Tiền Giang) lên Sa Đéc - Cao Lãnh - Tràm Chim (Đồng Tháp).",
    quiz: {
      "q": "Vườn Quốc gia Tràm Chim (Đồng Tháp) là khu Ramsar thế giới nổi tiếng với loài chim quý hiếm nào trong Sách đỏ?",
      "options": [
            "Chim cánh cụt",
            "Sếu đầu đỏ (Grus antigone)",
            "Đà điểu châu Phi",
            "Hải âu bắc cực"
      ],
      "ans": 1,
      "explain": "Tràm Chim là vương quốc của loài Sếu đầu đỏ quý hiếm cùng hàng trăm loài chim nước trong hệ sinh thái đất ngập nước Đồng Tháp Mười."
},
    questions: [
      {
            "q": "Vườn Quốc gia Tràm Chim (Đồng Tháp) là khu Ramsar thế giới nổi tiếng với loài chim quý hiếm nào trong Sách đỏ?",
            "options": [
                  "Chim cánh cụt",
                  "Sếu đầu đỏ (Grus antigone)",
                  "Đà điểu châu Phi",
                  "Hải âu bắc cực"
            ],
            "ans": 1,
            "explain": "Tràm Chim là vương quốc của loài Sếu đầu đỏ quý hiếm cùng hàng trăm loài chim nước trong hệ sinh thái đất ngập nước Đồng Tháp Mười."
      },
      {
            "q": "Làng hoa kiểng Sa Đéc có truyền thống trên 100 năm nổi bật với đặc trưng canh tác du lịch nào?",
            "options": [
                  "Hoa chỉ trồng trên vách núi đá cao",
                  "Hoa trồng trong nhà kính đóng kín hoàn toàn",
                  "Hoa được trồng trên các giàn cao trên mặt nước, nông dân chèo xuồng len lỏi chăm sóc hoa",
                  "Hoa chỉ nở vào mùa tuyết rơi"
            ],
            "ans": 2,
            "explain": "Làng hoa Sa Đéc rực rỡ sắc màu bên dòng sông Tiền, hoa được xếp giàn trên sóng nước tạo nên cảnh quan du lịch miệt vườn có một không hai."
      },
      {
            "q": "Khu di tích Quốc gia đặc biệt Gò Tháp tại Đồng Tháp lưu giữ dấu tích của nền văn hóa cổ xưa nào?",
            "options": [
                  "Văn hóa Hòa Bình",
                  "Văn hóa Đông Sơn",
                  "Văn hóa Sa Huỳnh",
                  "Nền văn hóa Óc Eo và vương quốc Phù Nam cổ đại"
            ],
            "ans": 3,
            "explain": "Gò Tháp là trung tâm tôn giáo, chính trị của vương quốc Phù Nam xưa với nhiều phế tích kiến trúc đền tháp và tượng thần Hindu giáo."
      }
]
  },
  {
    id: "VN-31",
    stt: 31,
    name: "Vĩnh Long",
    mergedFrom: "Hợp nhất Vĩnh Long + Bến Tre + Trà Vinh",
    regionCode: "V6",
    regionName: "Đồng bằng sông Cửu Long",
    color: "#10B981",
    x: 0.8,
    z: 27.2,
    polygon: [[-0.8, 25.5], [3.2, 25.6], [2.8, 29.0], [-0.5, 28.5]],
    hubs: [
      { name: "Vĩnh Long", x: 0.0, z: 26.5 },
      { name: "Bến Tre", x: 1.8, z: 26.2 },
      { name: "Trà Vinh", x: 1.2, z: 28.0 }
    ],
    landmarkType: "floating_market",
    transport: [
      "Cầu Mỹ Thuận 1 & 2, Cầu Rạch Miễu 1 & 2, Cầu Cổ Chiên, Cầu Đại Ngãi",
      "Hệ thống sông Tiền - sông Cổ Chiên - sông Hậu"
    ],
    attractions: [
      {
        name: "Vương quốc Gốm đỏ Mang Thít & Cù lao An Bình",
        cluster: "Cụm Di sản Đương đại Vĩnh Long",
        desc: "Hàng trăm lò gạch gốm đỏ rực dọc dòng kênh Thầy Cai và mô hình Homestay miệt vườn tiên phong tại Cù lao An Bình."
      },
      {
        name: "Cồn Phụng, Cồn Quy & Không gian Xứ Dừa Bến Tre",
        cluster: "Cụm Miệt vườn Dừa (Bến Tre)",
        desc: "Du lịch sinh thái dưới tán dừa xanh, Làng hoa kiểng Chợ Lách và Khu di tích Danh nhân văn hóa thế giới Nguyễn Đình Chiểu."
      },
      {
        name: "Ao Bà Om, Chùa Âng, Chùa Hang & Cù lao Tân Quy",
        cluster: "Cụm Văn hóa Khmer (Trà Vinh)",
        desc: "Quần thể di tích danh thắng Ao Bà Om rợp bóng cây cổ thụ trăm năm và lễ hội Ok Om Bok."
      }
    ],
    cuisine: ["Kẹo dừa & Cơm dừa tôm rang Bến Tre", "Cá tai tượng chiên xù Vĩnh Long", "Bún nước lèo Trà Vinh", "Dừa sáp Cầu Kè", "Bưởi Năm Roi"],
    routeAdvice: "Vùng đất 'Tam giang hội tụ' nằm giữa sông Tiền và sông Hậu vươn ra Biển Đông, kết hợp Văn hóa Miệt vườn Kinh - Khmer - Hoa.",
    quiz: {
      "q": "Tỉnh Vĩnh Long nằm trọn vẹn ở vị trí địa lý đắc địa nào của vùng Tây Nam Bộ?",
      "options": [
            "Nằm sâu trong vịnh kín",
            "Nằm trên cao nguyên bazan khô hạn",
            "Nằm giữa hai nhánh sông Tiền và sông Hậu, tạo nên vùng đất phù sa màu mỡ và các cù lao trĩu quả",
            "Nằm trên đỉnh núi cao"
      ],
      "ans": 2,
      "explain": "Vĩnh Long nằm trọn trong vùng châu thổ giữa sông Tiền và sông Hậu, là trung tâm miệt vườn trái cây trù phú bậc nhất miền Tây."
},
    questions: [
      {
            "q": "Tỉnh Vĩnh Long nằm trọn vẹn ở vị trí địa lý đắc địa nào của vùng Tây Nam Bộ?",
            "options": [
                  "Nằm sâu trong vịnh kín",
                  "Nằm trên cao nguyên bazan khô hạn",
                  "Nằm giữa hai nhánh sông Tiền và sông Hậu, tạo nên vùng đất phù sa màu mỡ và các cù lao trĩu quả",
                  "Nằm trên đỉnh núi cao"
            ],
            "ans": 2,
            "explain": "Vĩnh Long nằm trọn trong vùng châu thổ giữa sông Tiền và sông Hậu, là trung tâm miệt vườn trái cây trù phú bậc nhất miền Tây."
      },
      {
            "q": "Làng gốm đỏ Mang Thít bên dòng sông Cổ Chiên được vinh danh là:",
            "options": [
                  "Lò luyện thủy tinh công nghiệp",
                  "Làng đúc tiền vàng cổ",
                  "Xưởng đóng du thuyền vỏ thép",
                  "Vương quốc đỏ - Quần thể lò gạch gốm đất nung truyền thống trăm năm độc nhất vô nhị"
            ],
            "ans": 3,
            "explain": "Hàng nghìn lò gạch gốm đỏ soi bóng bên dòng sông Cổ Chiên tạo nên di sản đương đại 'Vương quốc gốm đỏ Mang Thít' huyền bí."
      },
      {
            "q": "Mô hình du lịch Homestay nhà dân tại Cù lao An Bình (Vĩnh Long) thu hút khách quốc tế nhờ:",
            "options": [
                  "Trải nghiệm đời sống chân chất của nông dân Nam Bộ (chèo xuồng, tát mương bắt cá, đờn ca tài tử)",
                  "Hệ thống sòng bài khách sạn chọc trời",
                  "Dịch vụ mua sắm miễn thuế",
                  "Khu đua xe công thức một"
            ],
            "ans": 0,
            "explain": "Du lịch sinh thái cù lao An Bình là cái nôi homestay của miền Tây, nơi du khách được cùng ăn, cùng ở, cùng trải nghiệm nhịp sống dân dã."
      }
]
  },
  {
    id: "VN-32",
    stt: 32,
    name: "TP. Cần Thơ",
    mergedFrom: "Hợp nhất TP. Cần Thơ + Sóc Trăng + Hậu Giang",
    regionCode: "V6",
    regionName: "Đồng bằng sông Cửu Long",
    color: "#F5C71A",
    x: -1.8,
    z: 28.8,
    polygon: [[-3.2, 26.2], [0.0, 26.8], [0.5, 31.0], [-2.8, 30.2]],
    hubs: [
      { name: "Cần Thơ", x: -1.5, z: 27.2 },
      { name: "Vị Thanh", x: -2.4, z: 28.5 },
      { name: "Sóc Trăng", x: -0.8, z: 30.0 }
    ],
    landmarkType: "floating_market",
    transport: [
      "Cảng Hàng không Quốc tế Cần Thơ",
      "Cao tốc Cần Thơ - Cà Mau, Cao tốc Châu Đốc - Cần Thơ - Sóc Trăng",
      "Cảng biển Nước sâu Trần Đề, Tàu cao tốc Trần Đề - Côn Đảo"
    ],
    attractions: [
      {
        name: "Chợ nổi Cái Răng, Bến Ninh Kiều, Nhà cổ Bình Thủy & Cồn Sơn",
        cluster: "Cụm Đô thị Sông nước (Cần Thơ)",
        desc: "Di sản văn hóa phi vật thể quốc gia Chợ nổi Cái Răng trên sông Cần Thơ, Cầu đi bộ Ninh Kiều và du lịch cộng đồng Cồn Sơn (cá lóc bay)."
      },
      {
        name: "Chùa Dơi (Mahatup), Chùa Som Rong & Chùa Chén Kiểu",
        cluster: "Cụm Văn hóa Chùa Khmer & Lễ hội Đua ghe Ngo (Sóc Trăng)",
        desc: "Kiến trúc chùa Khmer độc đáo và Lễ hội Oóc Om Bóc - Đua ghe Ngo sôi động."
      },
      {
        name: "Khu bảo tồn thiên nhiên Lung Ngọc Hoàng",
        cluster: "Cụm Sinh thái Rừng tràm (Hậu Giang)",
        desc: "'Lá phổi xanh' của vùng Tây sông Hậu với hệ động thực vật đất ngập nước phong phú."
      }
    ],
    cuisine: ["Lẩu mắm & Bánh cống Cần Thơ", "Bánh pía Sóc Trăng", "Bún nước lèo Sóc Trăng", "Cá thát lát Hậu Giang", "Khóm Cầu Đúc"],
    routeAdvice: "Thủ phủ trung tâm của toàn vùng ĐBSCL, nay có thêm cửa ngõ ra biển Đông và bến tàu cao tốc đi Côn Đảo tại Trần Đề (Sóc Trăng).",
    quiz: {
      "q": "Thành phố Cần Thơ giữ vị thế chiến lược nào trong phát triển du lịch vùng Đồng bằng sông Cửu Long?",
      "options": [
            "Chỉ phục vụ hoạt động sản xuất xi măng",
            "Là điểm du lịch nông thôn cách biệt",
            "Không có đường thủy kết nối",
            "Là đô thị loại I trực thuộc Trung ương, trung tâm kinh tế - văn hóa và đầu mối giao thông của cả vùng Tây Nam Bộ"
      ],
      "ans": 3,
      "explain": "Cần Thơ - Tây Đô là trung tâm đô thị sông nước sầm uất nhất miền Tây với Cảng Hàng không Quốc tế Cần Thơ kết nối mọi miền đất nước."
},
    questions: [
      {
            "q": "Thành phố Cần Thơ giữ vị thế chiến lược nào trong phát triển du lịch vùng Đồng bằng sông Cửu Long?",
            "options": [
                  "Chỉ phục vụ hoạt động sản xuất xi măng",
                  "Là điểm du lịch nông thôn cách biệt",
                  "Không có đường thủy kết nối",
                  "Là đô thị loại I trực thuộc Trung ương, trung tâm kinh tế - văn hóa và đầu mối giao thông của cả vùng Tây Nam Bộ"
            ],
            "ans": 3,
            "explain": "Cần Thơ - Tây Đô là trung tâm đô thị sông nước sầm uất nhất miền Tây với Cảng Hàng không Quốc tế Cần Thơ kết nối mọi miền đất nước."
      },
      {
            "q": "Chợ nổi Cái Răng tại Cần Thơ mang nét văn hóa giao thương đặc sắc nào trên sông nước?",
            "options": [
                  "Tập quán 'bẹo hàng' trên cây sào đầu mũi ghe thuyền để chào bán nông sản hoa trái",
                  "Bán hàng qua màn hình điện tử tự động",
                  "Chỉ mua bán bằng ngoại tệ đô la",
                  "Bán hàng qua hệ thống băng chuyền ngầm"
            ],
            "ans": 0,
            "explain": "Cây bẹo chợ nổi Cái Răng là biểu tượng văn hóa sông nước độc đáo, treo gì bán nấy, tạo nên bức tranh bình minh sông rộn rã thanh âm."
      },
      {
            "q": "Nhà cổ Bình Thủy tại Cần Thơ là minh chứng tiêu biểu cho phong cách kiến trúc nào?",
            "options": [
                  "Kiến trúc lâu đài La Mã cổ",
                  "Sự kết hợp tinh tế giữa kiến trúc biệt thự Pháp cổ điển và nhà truyền thống 5 gian Nam Bộ",
                  "Kiến trúc tháp tròn Tây Á",
                  "Kiến trúc nhà sàn gỗ vùng cao"
            ],
            "ans": 1,
            "explain": "Nhà cổ Bình Thủy xây dựng từ năm 1870 giao thoa nghệ thuật phương Tây và hoa văn chạm khắc gỗ thuần Việt, là bối cảnh nhiều bộ phim quốc tế."
      }
]
  },
  {
    id: "VN-33",
    stt: 33,
    name: "An Giang",
    mergedFrom: "Hợp nhất An Giang + Kiên Giang (gồm Đảo Phú Quốc, Hòn Sơn)",
    regionCode: "V6",
    regionName: "Đồng bằng sông Cửu Long",
    color: "#0047BA",
    x: -4.8,
    z: 26.8,
    polygon: [[-6.8, 24.2], [-2.8, 24.5], [-3.0, 29.5], [-6.2, 28.8]],
    hubs: [
      { name: "Long Xuyên", x: -3.5, z: 25.8 },
      { name: "Rạch Giá", x: -4.8, z: 27.8 }
    ],
    landmarkType: "port_island",
    transport: [
      "Cảng Hàng không Quốc tế Phú Quốc & Sân bay Rạch Giá",
      "Cao tốc Châu Đốc - Cần Thơ",
      "Tàu cao tốc Rạch Giá / Hà Tiên đi Phú Quốc, Nam Du, Hòn Sơn"
    ],
    attractions: [
      {
        name: "Thành phố Đảo Ngọc Phú Quốc, Quần đảo Nam Du, Bà Lụa & Hà Tiên",
        cluster: "Cụm Thiên đường Biển đảo Tây Nam (Kiên Giang)",
        desc: "Trung tâm nghỉ dưỡng - giải trí quốc tế Phú Quốc (Cáp treo Hòn Thơm, Grand World, Safari, Cầu Hôn), VQG U Minh Thượng và Hà Tiên thập cảnh."
      },
      {
        name: "Khu du lịch Quốc gia Núi Sam (Miếu Bà Chúa Xứ), Núi Cấm & Rừng tràm Trà Sư",
        cluster: "Cụm Tâm linh Thất Sơn & Mùa nước nổi (An Giang)",
        desc: "Lễ hội Vía Bà Chúa Xứ Núi Sam (Di sản UNESCO), Rừng tràm Trà Sư phủ bèo xanh mướt và văn hóa Chăm Châu Phong."
      }
    ],
    cuisine: ["Bún quậy & Gỏi cá trích Phú Quốc", "Nước mắm Phú Quốc", "Bún cá Châu Đốc", "Lẩu mắm & Đường thốt nốt An Giang"],
    routeAdvice: "Sự kết hợp tạo nên sản phẩm độc nhất ở miền Tây: Hành hương Thất Sơn - Rừng tràm Trà Sư (Châu Đốc) rồi lên tàu cao tốc tại Hà Tiên/Rạch Giá ra Đảo Ngọc Phú Quốc.",
    quiz: {
      "q": "Vùng Bảy Núi (Thất Sơn) tại An Giang là điểm đến du lịch tự nhiên - tâm linh độc đáo nhờ đặc điểm gì?",
      "options": [
            "Bảy ngọn núi sừng sững nổi lên giữa vùng đồng bằng châu thổ trũng thấp ngập nước",
            "Dãy núi đá vôi ven biển sâu",
            "Bình nguyên cát đỏ",
            "Hồ băng tuyết vĩnh cửu"
      ],
      "ans": 0,
      "explain": "Thất Sơn hùng vĩ nổi bật giữa cánh đồng Tà Pạ mang nhiều huyền tích kỳ bí, gắn liền với văn hóa tâm linh của đồng bào Kinh, Khmer, Chăm, Hoa."
},
    questions: [
      {
            "q": "Vùng Bảy Núi (Thất Sơn) tại An Giang là điểm đến du lịch tự nhiên - tâm linh độc đáo nhờ đặc điểm gì?",
            "options": [
                  "Bảy ngọn núi sừng sững nổi lên giữa vùng đồng bằng châu thổ trũng thấp ngập nước",
                  "Dãy núi đá vôi ven biển sâu",
                  "Bình nguyên cát đỏ",
                  "Hồ băng tuyết vĩnh cửu"
            ],
            "ans": 0,
            "explain": "Thất Sơn hùng vĩ nổi bật giữa cánh đồng Tà Pạ mang nhiều huyền tích kỳ bí, gắn liền với văn hóa tâm linh của đồng bào Kinh, Khmer, Chăm, Hoa."
      },
      {
            "q": "Lễ hội Vía Bà Chúa Xứ Núi Sam (Châu Đốc, An Giang) thu hút hàng triệu lượt khách mỗi năm mang ý nghĩa gì?",
            "options": [
                  "Hội thi nhảy dù quốc tế",
                  "Lễ hội tâm linh lớn nhất Nam Bộ, thể hiện ước vọng bình an, mưa thuận gió hòa và tài lộc của người dân",
                  "Lễ hội hóa trang đường phố châu Âu",
                  "Hội chợ triển lãm máy cày"
            ],
            "ans": 1,
            "explain": "Lễ hội Vía Bà Chúa Xứ Núi Sam được công nhận là Di sản văn hóa phi vật thể quốc gia, là trung tâm hành hương tâm linh hàng đầu miền Nam."
      },
      {
            "q": "Rừng tràm Trà Sư tại An Giang là đại diện tiêu biểu cho hệ sinh thái tự nhiên nào?",
            "options": [
                  "Hệ sinh thái sa mạc",
                  "Hệ sinh thái rừng lá rụng ôn đới",
                  "Hệ sinh thái rừng tràm đất ngập nước nội địa đặc trưng của miền Tây mùa nước nổi",
                  "Hệ sinh thái rừng tuyết"
            ],
            "ans": 2,
            "explain": "Rừng tràm Trà Sư với thảm bèo cám xanh mướt trải dài vô tận và hàng vạn cánh chim trời là tuyệt tác sinh thái mùa nước nổi miền Tây."
      }
]
  },
  {
    id: "VN-34",
    stt: 34,
    name: "Cà Mau",
    mergedFrom: "Hợp nhất Cà Mau + Bạc Liêu (gồm Đảo Hòn Khoai)",
    regionCode: "V6",
    regionName: "Đồng bằng sông Cửu Long",
    color: "#F05A22",
    x: -3.8,
    z: 32.2,
    polygon: [[-5.5, 29.5], [-1.0, 30.5], [-2.5, 34.2], [-5.8, 34.8]],
    hubs: [
      { name: "Bạc Liêu", x: -1.8, z: 31.2 },
      { name: "Cà Mau", x: -4.2, z: 32.5 }
    ],
    landmarkType: "cape_ship",
    transport: [
      "Sân bay Cà Mau",
      "Cao tốc Cần Thơ - Cà Mau - Đất Mũi, Quốc lộ 1A (Điểm cuối tại Năm Căn - Đất Mũi)"
    ],
    attractions: [
      {
        name: "Khu du lịch Quốc gia Mũi Cà Mau & Vườn Quốc gia U Minh Hạ",
        cluster: "Cụm Cực Nam Tổ quốc (Cà Mau)",
        desc: "Cột mốc tọa độ Quốc gia GPS 0001, Biểu tượng Con tàu Cà Mau no gió, Khu dự trữ sinh quyển thế giới Mũi Cà Mau và cụm đảo Hòn Khoai."
      },
      {
        name: "Cánh đồng Điện gió Bạc Liêu, Nhà Công tử Bạc Liêu & Khu lưu niệm Cao Văn Lầu",
        cluster: "Cụm Văn hóa Đờn ca tài tử (Bạc Liêu)",
        desc: "Nơi ra đời bản 'Dạ cổ hoài lang' của cố nhạc sĩ Cao Văn Lầu, Quán Âm Phật Đài (Mẹ Nam Hải) và Chùa Xiêm Cán."
      }
    ],
    cuisine: ["Cua biển Cà Mau", "Lẩu mắm & Mật ong rừng U Minh", "Cá thòi lòi nướng", "Bánh củ cải & Bún bò cay Bạc Liêu"],
    routeAdvice: "Điểm kết thúc thiêng liêng của hành trình xuyên Việt từ Cột cờ Lũng Cú (Tuyên Quang) đến Mũi Cà Mau.",
    quiz: {
      "q": "Mũi Cà Mau có vị trí địa lý thiêng liêng và đặc biệt nào trên bản đồ Tổ quốc Việt Nam?",
      "options": [
            "Là điểm Cực Bắc giáp ranh Trung Quốc",
            "Là điểm Cực Nam của Tổ quốc trên đất liền, nơi du khách có thể ngắm cả mặt trời mọc ở biển Đông và lặn ở biển Tây",
            "Là đỉnh núi cao nhất nước ta",
            "Là hoang mạc cát rộng lớn nhất"
      ],
      "ans": 1,
      "explain": "Đất Mũi Cà Mau là điểm tận cùng phương Nam thiêng liêng của Tổ quốc với Cột cờ Hà Nội tại Mũi Cà Mau và Mốc tọa độ quốc gia GPS 0001."
},
    questions: [
      {
            "q": "Mũi Cà Mau có vị trí địa lý thiêng liêng và đặc biệt nào trên bản đồ Tổ quốc Việt Nam?",
            "options": [
                  "Là điểm Cực Bắc giáp ranh Trung Quốc",
                  "Là điểm Cực Nam của Tổ quốc trên đất liền, nơi du khách có thể ngắm cả mặt trời mọc ở biển Đông và lặn ở biển Tây",
                  "Là đỉnh núi cao nhất nước ta",
                  "Là hoang mạc cát rộng lớn nhất"
            ],
            "ans": 1,
            "explain": "Đất Mũi Cà Mau là điểm tận cùng phương Nam thiêng liêng của Tổ quốc với Cột cờ Hà Nội tại Mũi Cà Mau và Mốc tọa độ quốc gia GPS 0001."
      },
      {
            "q": "Vườn Quốc gia Mũi Cà Mau sở hữu hệ sinh thái rừng tự nhiên quý giá nào lớn thứ hai trên thế giới?",
            "options": [
                  "Rừng tre trúc vùng núi cao",
                  "Rừng lá kim ôn đới",
                  "Hệ sinh thái rừng ngập mặn (rừng đước, mắm)",
                  "Thảo nguyên cỏ khô châu Phi"
            ],
            "ans": 2,
            "explain": "Rừng ngập mặn Cà Mau lớn thứ 2 thế giới (chỉ sau rừng ngập mặn cửa sông Amazon), được UNESCO công nhận là Khu Dự trữ Sinh quyển Thế giới."
      },
      {
            "q": "Đặc sản ẩm thực nức tiếng nào của Cà Mau đã được đăng ký chỉ dẫn địa lý và là món ngon không thể bỏ qua của du khách?",
            "options": [
                  "Thịt cừu nướng",
                  "Cá hồi phi lê",
                  "Bánh đậu xanh",
                  "Cua biển Năm Căn Cà Mau và Tôm khô Rạch Gốc"
            ],
            "ans": 3,
            "explain": "Cua Cà Mau nổi tiếng khắp trong và ngoài nước nhờ thịt chắc ngọt đậm đà và gạch thơm bùi sinh trưởng dưới tán rừng ngập mặn trù phú."
      }
]
  }
];

export const ISLANDS_DATA: Island[] = [
  { id: "IS-CATBA", name: "Cát Bà", parentProvinceId: "VN-13", x: 9.8, z: -33.0, color: "#34D399", isSovereign: false },
  { id: "IS-CONCO", name: "Cồn Cỏ", parentProvinceId: "VN-19", x: 8.2, z: -10.2, color: "#F5C71A", isSovereign: false },
  { id: "IS-HOANGSA", name: "Quần Đảo Hoàng Sa (TP. Đà Nẵng)", parentProvinceId: "VN-21", x: 22.0, z: -4.5, color: "#EF4444", isSovereign: true },
  { id: "IS-LYSON", name: "Đảo Lý Sơn", parentProvinceId: "VN-22", x: 15.2, z: 0.8, color: "#2CE5C3", isSovereign: false },
  { id: "IS-PHUQUY", name: "Đảo Phú Quý", parentProvinceId: "VN-26", x: 13.8, z: 22.2, color: "#F5C71A", isSovereign: false },
  { id: "IS-TRUONGSA", name: "Quần Đảo Trường Sa (Khánh Hòa)", parentProvinceId: "VN-25", x: 24.0, z: 24.5, color: "#EF4444", isSovereign: true },
  { id: "IS-CONSON", name: "Đảo Côn Sơn (Côn Đảo)", parentProvinceId: "VN-29", x: 3.2, z: 32.8, color: "#2CE5C3", isSovereign: false },
  { id: "IS-PHUQUOC", name: "Đảo Phú Quốc", parentProvinceId: "VN-33", x: -9.8, z: 27.2, color: "#F05A22", isSovereign: false },
  { id: "IS-HONSON", name: "Hòn Sơn", parentProvinceId: "VN-33", x: -7.5, z: 28.8, color: "#F59E0B", isSovereign: false },
  { id: "IS-HONKHOAI", name: "Hòn Khoai", parentProvinceId: "VN-34", x: -4.2, z: 36.2, color: "#F5C71A", isSovereign: false }
];

export const TOUR_CHALLENGES: TourChallenge[] = [
  {
    title: "Tuyến 1: Tam giác Di sản Đông Bắc & Kinh Bắc",
    desc: "Khách quốc tế muốn đi tuyến 4N3Đ kết nối Di sản Vịnh Hạ Long - Quần đảo Cát Bà và vùng văn hóa Quan họ - Chùa Vĩnh Nghiêm Kinh Bắc. Hãy chọn 3 tỉnh/thành:",
    targetIds: ["VN-09", "VN-13", "VN-11"],
    targetNames: ["Quảng Ninh", "TP. Hải Phòng", "Bắc Ninh"]
  },
  {
    title: "Tuyến 2: Vòng cung Tây Bắc hùng vĩ - Nóc nhà Đông Dương",
    desc: "Hành trình khám phá thiên nhiên và lịch sử Tây Bắc: vượt đèo Pha Đin qua Chiến trường Điện Biên Phủ ➔ Đèo Ô Quy Hồ & Sìn Hồ ➔ Sa Pa & Đỉnh Fansipan:",
    targetIds: ["VN-05", "VN-04", "VN-03"],
    targetNames: ["Điện Biên", "Lai Châu", "Lào Cai"]
  },
  {
    title: "Tuyến 3: Cội nguồn Văn hiến Thăng Long - Hoa Lư & Vùng Đất Tổ",
    desc: "Hành trình ngàn năm văn hiến khởi đầu từ Cội nguồn Đền Hùng Đất Tổ ➔ Thủ đô Hà Nội 36 phố phường ➔ Quần thể Danh thắng Tràng An & Cố đô Hoa Lư:",
    targetIds: ["VN-10", "VN-12", "VN-15"],
    targetNames: ["Phú Thọ", "TP. Hà Nội", "Ninh Bình"]
  },
  {
    title: "Tuyến 4: Con đường Di sản Miền Trung huyền thoại",
    desc: "Thiết kế tuyến đường bộ kết nối Địa đạo Vịnh Mốc & Di tích Quảng Trị ➔ Quần thể Di tích Cố đô Huế ➔ Phố cổ Hội An, Ngũ Hành Sơn & Cầu Vàng Đà Nẵng:",
    targetIds: ["VN-19", "VN-20", "VN-21"],
    targetNames: ["Quảng Trị", "TP. Huế", "TP. Đà Nẵng"]
  },
  {
    title: "Tuyến 5: Cung đường Lịch sử Vĩ tuyến 17 & Đất học Lam Hồng",
    desc: "Hành trình về nguồn Bắc Trung Bộ: Di sản Thành Nhà Hồ & Sầm Sơn ➔ Quê Bác Nam Đàn & Rừng Pù Mát ➔ Khu lưu niệm Đại thi hào Nguyễn Du & Ngã ba Đồng Lộc:",
    targetIds: ["VN-16", "VN-17", "VN-18"],
    targetNames: ["Thanh Hóa", "Nghệ An", "Hà Tĩnh"]
  },
  {
    title: "Tuyến 6: Rừng Hoa Cao nguyên & Biển xanh Cực Đông Nam Trung Bộ",
    desc: "Hành trình liên kết Cao nguyên - Duyên hải: Thành phố ngàn hoa Đà Lạt ➔ Vịnh Nha Trang & Tháp Trầm Hương ➔ Bờ biển Sa Huỳnh, Đảo Lý Sơn & Quê hương Đội Hoàng Sa:",
    targetIds: ["VN-26", "VN-25", "VN-22"],
    targetNames: ["Lâm Đồng", "Khánh Hòa", "Quảng Ngãi"]
  },
  {
    title: "Tuyến 7: Huyền thoại Sử thi Tây Nguyên & Không gian Cồng chiêng",
    desc: "Khám phá Không gian Văn hóa Cồng chiêng Tây Nguyên: Biển Hồ Pleiku & Núi lửa Chư Đăng Ya ➔ Thủ phủ Cà phê Buôn Ma Thuột & Hồ Lắk ➔ Thác Dambri & Cao nguyên Lang Biang:",
    targetIds: ["VN-23", "VN-24", "VN-26"],
    targetNames: ["Gia Lai", "Đắk Lắk", "Lâm Đồng"]
  },
  {
    title: "Tuyến 8: Trọng điểm Kinh tế Năng động & Đô thị Biển Đông Nam Bộ",
    desc: "Tuyến du lịch sinh thái và đô thị phương Nam: Núi Bà Đen nóc nhà Nam Bộ ➔ Đô thị sông nước & Di tích Dinh Độc Lập TP.HCM ➔ Vườn Quốc gia Cát Tiên & Chiến khu Đ:",
    targetIds: ["VN-28", "VN-29", "VN-27"],
    targetNames: ["Tây Ninh", "TP. Hồ Chí Minh", "Đồng Nai"]
  },
  {
    title: "Tuyến 9: Sắc màu Miệt vườn Chợ nổi & Thất Sơn Tây Nam Bộ",
    desc: "Cung đường sông nước Cửu Long: Làng hoa Sa Đéc & Vườn Tràm Gáo Giồng ➔ Miệt vườn cù lao An Bình Vĩnh Long ➔ Thủ phủ miền Tây & Chợ nổi Cái Răng Cần Thơ:",
    targetIds: ["VN-30", "VN-31", "VN-32"],
    targetNames: ["Đồng Tháp", "Vĩnh Long", "TP. Cần Thơ"]
  },
  {
    title: "Tuyến 10: Hành trình Cực Nam Đất Mũi & Biển đảo Kiên Giang - Cà Mau",
    desc: "Chinh phục miền Tây Nam Bộ khởi hành từ Chợ nổi Cái Răng Cần Thơ ➔ Rừng tràm Trà Sư & Đảo ngọc Phú Quốc (An Giang - Kiên Giang) ➔ Mốc tọa độ Quốc gia GPS 0001 tại Đất Mũi Cà Mau:",
    targetIds: ["VN-32", "VN-33", "VN-34"],
    targetNames: ["TP. Cần Thơ", "An Giang", "Cà Mau"]
  }
];
