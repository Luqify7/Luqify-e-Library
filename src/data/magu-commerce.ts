export const maguCommerce = {
  faculty: "Faculty of Commerce and Management",

  commonCore: {
    description:
      "Shared Commerce foundation courses for Accountancy, Accounting, Banking and Finance, Business Administration, Human Resource Management, Marketing and Monitoring and Evaluation students.",

    years: {
      1: {
        semesters: {
          1: [
            ["Academic Writing", "academic-writing"],
            ["Accounting Fundamental", "accounting-fundamental"],
            ["Business Mathematics", "business-mathematics"],
            ["Co-operative Management Fundamental", "co-operative-management-fundamental"],
            ["End-User Computing", "end-user-computing"],
            ["Old Testament", "old-testament"],
          ],

          2: [
            ["Business Communication", "business-communication"],
            ["Business Statistics", "business-statistics"],
            ["Business Law", "business-law"],
            ["Financial Accounting", "financial-accounting"],
            ["Organisational Behaviour", "organisational-behaviour"],
            ["New Testament", "new-testament"],
          ],
        },
      },

      2: {
        semesters: {
          1: [
            ["Corporate Law", "corporate-law"],
            ["Human Resource Management Fundamentals", "human-resource-management-fundamentals"],
            ["Malawi Taxation", "malawi-taxation"],
            ["Micro Economics", "micro-economics"],
            ["Essentials of Christianity", "essentials-of-christianity"],
            ["Cost Accounting Fundamentals", "cost-accounting-fundamentals"],
          ],

          2: [
            ["Banking Fundamentals", "banking-fundamentals"],
            ["Macro Economics", "macro-economics"],
            ["Marketing Fundamentals", "marketing-fundamentals"],
            ["Project Management", "project-management"],
            ["Cost and Budgetary Control", "cost-and-budgetary-control"],
            ["Developing Christian Worldviews", "developing-christian-worldviews"],
          ],
        },
      },
    },
  },


  programmes: {


    accounting: {

      name: "Bachelor of Commerce Accounting",

      years: {

        3: {

          semesters: {

            1: [
              ["Electronic Business (E-Business)", "electronic-business"],
              ["Ethics and Governance", "ethics-and-governance"],
              ["Audit and Assurance", "audit-and-assurance"],
              ["Risk Management", "risk-management"],
              ["Research Methods", "research-methods"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],

            2: [
              ["Business Analysis", "business-analysis"],
              ["Financial Reporting", "financial-reporting"],
              ["Management Accounting", "management-accounting"],
              ["Financial Management", "financial-management"],
              ["Public Finance", "public-finance"],
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
              ["Rural Finance", "rural-finance"],
              ["Research Methods", "research-methods"],
              ["Audit and Assurance", "audit-and-assurance"],
              ["Entrepreneurship 1", "entrepreneurship-1"],
            ],

            2: [
              ["International Finance and Trade", "international-finance-and-trade"],
              ["Portfolio Management and Investment Analysis", "portfolio-management-and-investment-analysis"],
              ["Service Marketing and Customer Relationship Management", "service-marketing-and-customer-relationship-management"],
              ["Financial Management", "financial-management"],
              ["Risk Management", "risk-management"],
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
              ["Financial Reporting Analysis and Planning", "financial-reporting-analysis-and-planning"],
              ["Principles of Investments", "principles-of-investments"],
              ["Treasury Management", "treasury-management"],
              ["Public Finance", "public-finance"],
              ["Entrepreneurship 3", "entrepreneurship-3"],
            ],

          },

        },

      },

    },

  },

} as const;