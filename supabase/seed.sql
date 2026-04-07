-- Planora MVP Seed Data
-- 15 test leveranciers: 8 Antwerpen regio, 7 Gent regio

-- Suppliers
INSERT INTO suppliers (id, company_name, contact_name, email, phone, rating, review_count, verified, active, created_at) VALUES
-- Antwerpen regio (2000-2999)
('sup-ant-001', 'EcoWarm Solutions', 'Jan De Smedt', 'info@ecowarm.be', '+32 3 123 45 01', 4.8, 67, true, true, now()),
('sup-ant-002', 'Warmte Expert Antwerpen', 'Pieter Janssens', 'info@warmte-expert.be', '+32 3 123 45 02', 4.6, 43, true, true, now()),
('sup-ant-003', 'GreenHeat Belgium', 'Marie Peeters', 'info@greenheat.be', '+32 3 123 45 03', 4.9, 89, true, true, now()),
('sup-ant-004', 'Duurzaam Verwarmen', 'Tom Van den Berg', 'info@duurzaamverwarmen.be', '+32 3 123 45 04', 4.3, 28, true, true, now()),
('sup-ant-005', 'Klimaat Comfort BVBA', 'Sarah Willems', 'info@klimaatcomfort.be', '+32 3 123 45 05', 4.5, 51, true, true, now()),
('sup-ant-006', 'RaamWerk Antwerpen', 'Koen Maes', 'info@raamwerk-antwerpen.be', '+32 3 123 45 06', 4.7, 38, true, true, now()),
('sup-ant-007', 'IsolatieSpecialist', 'Luc Vermeersch', 'info@isolatiespecialist.be', '+32 3 123 45 07', 4.4, 22, true, true, now()),
('sup-ant-008', 'ThermoTech BVBA', 'Elke Claes', 'info@thermotech.be', '+32 3 123 45 08', 3.9, 15, true, true, now()),

-- Gent regio (9000-9999)
('sup-gent-001', 'Warmtepompen Gent', 'Bart Declercq', 'info@warmtepompen-gent.be', '+32 9 234 56 01', 4.7, 55, true, true, now()),
('sup-gent-002', 'EcoRaam Oost-Vlaanderen', 'Liesbeth Van Damme', 'info@ecoraam.be', '+32 9 234 56 02', 4.5, 33, true, true, now()),
('sup-gent-003', 'GentseIsolatie NV', 'Dirk Baert', 'info@gentseisolatie.be', '+32 9 234 56 03', 4.8, 72, true, true, now()),
('sup-gent-004', 'Klimaat Techniek Gent', 'Eva Martens', 'info@klimaattechniek.be', '+32 9 234 56 04', 4.2, 19, true, true, now()),
('sup-gent-005', 'Dak & Isolatie Oost', 'Wim Goossens', 'info@dakenisolatie-oost.be', '+32 9 234 56 05', 4.6, 41, true, true, now()),
('sup-gent-006', 'Ramen & Deuren Gent', 'An Verstraeten', 'info@ramendeuren-gent.be', '+32 9 234 56 06', 3.8, 12, true, true, now()),
('sup-gent-007', 'VlaamsWarm BV', 'Filip Hermans', 'info@vlaamswarm.be', '+32 9 234 56 07', 4.4, 36, true, true, now())
ON CONFLICT (id) DO NOTHING;

-- Supplier regions
INSERT INTO supplier_regions (supplier_id, postal_code_prefix) VALUES
-- Antwerpen suppliers
('sup-ant-001', '2000'), ('sup-ant-001', '2100'), ('sup-ant-001', '2200'),
('sup-ant-002', '2000'), ('sup-ant-002', '2100'),
('sup-ant-003', '2000'), ('sup-ant-003', '2100'), ('sup-ant-003', '2200'), ('sup-ant-003', '2300'),
('sup-ant-004', '2000'), ('sup-ant-004', '2600'),
('sup-ant-005', '2000'), ('sup-ant-005', '2100'), ('sup-ant-005', '2500'),
('sup-ant-006', '2000'), ('sup-ant-006', '2100'),
('sup-ant-007', '2000'), ('sup-ant-007', '2100'), ('sup-ant-007', '2200'),
('sup-ant-008', '2000'),
-- Gent suppliers
('sup-gent-001', '9000'), ('sup-gent-001', '9100'), ('sup-gent-001', '9200'),
('sup-gent-002', '9000'), ('sup-gent-002', '9100'),
('sup-gent-003', '9000'), ('sup-gent-003', '9100'), ('sup-gent-003', '9200'),
('sup-gent-004', '9000'),
('sup-gent-005', '9000'), ('sup-gent-005', '9100'),
('sup-gent-006', '9000'), ('sup-gent-006', '9100'),
('sup-gent-007', '9000'), ('sup-gent-007', '9100'), ('sup-gent-007', '9200')
ON CONFLICT DO NOTHING;

-- Supplier categories
INSERT INTO supplier_categories (supplier_id, category) VALUES
-- Antwerpen
('sup-ant-001', 'heat_pump_air_water'), ('sup-ant-001', 'heat_pump_hybrid'),
('sup-ant-002', 'heat_pump_air_water'), ('sup-ant-002', 'heat_pump_ground_water'),
('sup-ant-003', 'heat_pump_air_water'), ('sup-ant-003', 'heat_pump_ground_water'), ('sup-ant-003', 'heat_pump_hybrid'),
('sup-ant-004', 'heat_pump_air_water'),
('sup-ant-005', 'heat_pump_hybrid'), ('sup-ant-005', 'heat_pump_air_water'),
('sup-ant-006', 'windows_doors'),
('sup-ant-007', 'roof_insulation'),
('sup-ant-008', 'heat_pump_air_water'), ('sup-ant-008', 'roof_insulation'),
-- Gent
('sup-gent-001', 'heat_pump_air_water'), ('sup-gent-001', 'heat_pump_ground_water'),
('sup-gent-002', 'windows_doors'),
('sup-gent-003', 'roof_insulation'), ('sup-gent-003', 'heat_pump_air_water'),
('sup-gent-004', 'heat_pump_air_water'), ('sup-gent-004', 'heat_pump_hybrid'),
('sup-gent-005', 'roof_insulation'),
('sup-gent-006', 'windows_doors'),
('sup-gent-007', 'heat_pump_air_water'), ('sup-gent-007', 'heat_pump_hybrid')
ON CONFLICT DO NOTHING;
