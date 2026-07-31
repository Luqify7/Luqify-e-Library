// NOTE: MAGU does not publish official semester-level (1 vs 2) course placement.
// Course names/codes below are drawn from MAGU's official programme and course-code
// pages; semester distribution within each year is a best-effort placeholder and
// should be verified against the registrar/student portal before treating as final.

export const maguCommerce = {
  faculty: "Faculty of Commerce and Management",

  commonCore: {
    description:
      "Shared Commerce foundation courses for Accountancy, Banking and Finance, Business Administration, Human Resource Management, Marketing, Monitoring and Evaluation, Insurance and Risk Management, and Business Information Systems students.",

    years: {
      1: {
        semesters: {
          1: [
            ["Academic Writing", "academic-writing"],
            ["Accounting Fundamentals", "accounting-fundamentals"],
            ["Business Mathematics", "business-mathematics"],
            ["Co-operative Management Fundamentals", "co-operative-management-fundamentals"],
            ["Old Testament", "old-testament"]
            ["End-User Computing", "end-user-computing"],
          ],

          2: [
            ["Business Communication", "business-communication"],
            ["Business Statistics", "business-statistics"],
            ["Business Law", "business-law"],
            ["Financial Accounting", "financial-accounting"],
            ["Organisational Behaviuor", "organisational-behaviuor"]
            ["New Testament", "new-testament"]
          ],
        },
      },

      2: {
        semesters: {
          1: [
            ["Corporate Law", "corporate-law"],
            ["Cost Accounting Fundamentals", "cost-accounting-fundamentals"],
            ["Human Resource Management Fundamentals", "human-resource-management-fundamentals"],
            ["Malawi Taxation", "malawi-taxation"],
            ["Essentials of Christianity", "essentials-of-Christianity"],
            ["Micro Economics", "micro-economics"],

          ],

          2: [
            ["Banking Fundamentals", "banking-fundamentals"],
            ["Macro Economics", "macro-economics"],
            ["Marketing Fundamentals", "marketing-fundamentals"],
            ["Cost and Budgetary Control", "cost-and-budgetary-control"],
          ],
        },
      },
    },
  },

  programmes: {
    accountancy: {
      name: "Bachelor of Accountancy",

      years: {
        3: {
          semesters: {
            1: [
              ["Business Analysis", "business-analysis"],
              ["Financial Reporting", "financial-reporting"],
              ["Management Accounting", "management-accounting"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Audit and Assurance", "audit-and-assurance"],
              ["Risk Management", "risk-management"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Audit Planning and Investigations", "audit-planning-and-investigations"],
              ["Corporate Reporting", "corporate-reporting"],
              ["Strategic Financial Management", "strategic-financial-management"],
              ["Tax Planning", "tax-planning"],
              ["Public Sector Accounting", "public-sector-accounting"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "banking-and-finance": {
      name: "Bachelor of Commerce Banking and Finance",

      years: {
        3: {
          semesters: {
            1: [
              ["Banking Law", "banking-law"],
              ["Digital Banking", "digital-banking"],
              ["Micro Finance Management", "micro-finance-management"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Rural Finance", "rural-finance"],
              ["Audit and Assurance", "audit-and-assurance"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Credit and Risk Analysis", "credit-and-risk-analysis"],
              ["International Finance and Trade", "international-finance-and-trade"],
              ["Portfolio Management and Investment Analysis", "portfolio-management-and-investment-analysis"],
              ["Treasury Management", "treasury-management"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "business-administration": {
      name: "Bachelor of Business Administration",

      years: {
        3: {
          semesters: {
            1: [
              ["Strategic Management", "strategic-management"],
              ["Development Studies", "development-studies"],
              ["Leadership Development", "leadership-development"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["International Business Management", "international-business-management"],
              ["Negotiations and Conflict Management", "negotiations-and-conflict-management"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Management Consulting", "management-consulting"],
              ["Performance Management", "performance-management"],
              ["Occupational Health and Safety", "occupational-health-and-safety"],
              ["Public Relations", "public-relations"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "human-resource-management": {
      name: "Bachelor of Human Resource Management",

      years: {
        3: {
          semesters: {
            1: [
              ["Employee Motivation", "employee-motivation"],
              ["Employment Law", "employment-law"],
              ["Industrial Relations", "industrial-relations"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Human Resource Management Metrics and Analytics", "human-resource-management-metrics-and-analytics"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["International Human Resource Management", "international-human-resource-management"],
              ["Managing Change in Organizations", "managing-change-in-organizations"],
              ["Strategic Human Resource Management", "strategic-human-resource-management"],
              ["Talent Management", "talent-management"],
              ["Administrative Law", "administrative-law"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    marketing: {
      name: "Bachelor of Marketing",

      years: {
        3: {
          semesters: {
            1: [
              ["Consumer and Buyer Behaviour", "consumer-and-buyer-behaviour"],
              ["Marketing Communication", "marketing-communication"],
              ["Business to Business Marketing", "business-to-business-marketing"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Computer Graphics", "computer-graphics"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Customer Relationship Management", "customer-relationship-management"],
              ["Digital Marketing", "digital-marketing"],
              ["International Marketing", "international-marketing"],
              ["Product and Brand Management", "product-and-brand-management"],
              ["Service Marketing and Management", "service-marketing-and-management"],
              ["Strategic Marketing Management", "strategic-marketing-management"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "monitoring-and-evaluation": {
      name: "Bachelor of Monitoring and Evaluation",

      years: {
        3: {
          semesters: {
            1: [
              ["Fundamentals of Monitoring and Evaluation", "fundamentals-of-monitoring-and-evaluation"],
              ["Economic Planning, Monitoring and Evaluation", "economic-planning-monitoring-and-evaluation"],
              ["Evaluation Constraints", "evaluation-constraints"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Qualitative Evaluation", "qualitative-evaluation"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Data Management and Analysis", "data-management-and-analysis"],
              ["Ethics in Monitoring and Evaluation", "ethics-in-monitoring-and-evaluation"],
              ["Evaluation Capacity Development", "evaluation-capacity-development"],
              ["Project Design, Monitoring and Evaluation", "project-design-monitoring-and-evaluation"],
              ["Public Policy Design and Evaluation", "public-policy-design-and-evaluation"],
              ["Quantitative Evaluation", "quantitative-evaluation"],
              ["Results Oriented Monitoring and Evaluation", "results-oriented-monitoring-and-evaluation"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "insurance-and-risk-management": {
      name: "Bachelor of Insurance and Risk Management",

      years: {
        3: {
          semesters: {
            1: [
              ["Insurance Fundamentals", "insurance-fundamentals"],
              ["Insurance Broking", "insurance-broking"],
              ["Claims Insurance", "claims-insurance"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Insurance Law", "insurance-law"],
              ["Insurance Risk Management", "insurance-risk-management"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Health Care Insurance", "health-care-insurance"],
              ["Investment Planning", "investment-planning"],
              ["Motor Insurance", "motor-insurance"],
              ["Property Insurance", "property-insurance"],
              ["Reinsurance", "reinsurance"],
              ["Underwriting Practice", "underwriting-practice"],
              ["Marine Insurance", "marine-insurance"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },

    "business-information-systems": {
      name: "Bachelor of Business Information Systems",

      years: {
        3: {
          semesters: {
            1: [
              ["Data Structures and Algorithms", "data-structures-and-algorithms"],
              ["Mobile Application Development", "mobile-application-development"],
              ["Human-Computer Interaction", "human-computer-interaction"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],
            2: [
              ["Information Security and Cryptography", "information-security-and-cryptography"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 2", "entrepreneurship-2"],
              ["Thesis Proposal", "thesis-proposal"],
            ],
          },
        },

        4: {
          semesters: {
            1: [
              ["Work Placement (Industrial Attachment)", "work-placement-industrial-attachment"],
              ["Thesis Writing (Supervision)", "thesis-writing-supervision"],
            ],
            2: [
              ["Artificial Intelligence", "artificial-intelligence"],
              ["Business Intelligence", "business-intelligence"],
              ["Database Systems", "database-systems"],
              ["Information Systems Audit", "information-systems-audit"],
              ["Java Programming", "java-programming"],
              ["Object-Oriented Analysis and Design", "object-oriented-analysis-and-design"],
              ["Python Programming", "python-programming"],
              ["Systems Analysis and Design", "systems-analysis-and-design"],
              ["Web Programming", "web-programming"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],
          },
        },
      },
    },
  },
} as const;