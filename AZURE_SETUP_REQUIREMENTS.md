# Azure Setup Requirements

## Vấn đề hiện tại
Service principal được sử dụng trong GitHub Actions không có đủ quyền để:
1. Đăng ký Azure Resource Providers
2. Tạo Container Apps Environment
3. Triển khai Container Apps

## Giải pháp

### Bước 1: Đăng ký Resource Providers (Thực hiện thủ công)

Đăng nhập vào Azure Portal hoặc sử dụng Azure CLI với tài khoản có quyền Owner/Contributor trên subscription:

```bash
# Đăng ký Microsoft.App provider (cho Container Apps)
az provider register --namespace Microsoft.App --wait

# Đăng ký Microsoft.ContainerRegistry provider (cho ACR)
az provider register --namespace Microsoft.ContainerRegistry --wait

# Kiểm tra trạng thái đăng ký
az provider show -n Microsoft.App --query "registrationState"
az provider show -n Microsoft.ContainerRegistry --query "registrationState"
```

### Bước 2: Tạo Container Apps Environment

```bash
# Tạo Container Apps Environment
az containerapp env create \
  --name exam-planner-env \
  --resource-group <YOUR_RESOURCE_GROUP> \
  --location westus2

# Hoặc sử dụng Azure Portal:
# 1. Truy cập Azure Portal
# 2. Tìm "Container Apps Environments"
# 3. Tạo mới với tên: exam-planner-env
```

### Bước 3: Cấp quyền cho Service Principal

Service principal cần có ít nhất quyền **Contributor** trên Resource Group để có thể:
- Tạo và quản lý Container Apps
- Truy cập Azure Container Registry
- Cấu hình network và security

### Bước 4: Cập nhật GitHub Secrets

Đảm bảo các secrets sau đã được cấu hình:
- `AZURE_CREDENTIALS`: JSON của service principal
- `ACR_NAME`: Tên Azure Container Registry
- `AZURE_RESOURCE_GROUP`: Tên Resource Group
- `MONGODB_CONNECTION_STRING`: Connection string MongoDB
- `OPENAI_API_KEY`: API key OpenAI

## Kiểm tra sau khi setup

Chạy các lệnh sau để kiểm tra:

```bash
# Kiểm tra resource providers
az provider list --query "[?contains(namespace,'Microsoft.App') || contains(namespace,'Microsoft.ContainerRegistry')].{Namespace:namespace, State:registrationState}"

# Kiểm tra Container Apps Environment
az containerapp env list --resource-group <YOUR_RESOURCE_GROUP>

# Kiểm tra ACR
az acr list --resource-group <YOUR_RESOURCE_GROUP>
```

## Liên hệ hỗ trợ

Nếu gặp vấn đề với việc cấp quyền hoặc đăng ký providers, liên hệ với quản trị Azure của tổ chức hoặc người có quyền Owner trên subscription.